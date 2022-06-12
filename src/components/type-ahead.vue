<template>
  <div class="input-group" :class="[classes]" v-click-outside="reset">
    <valid-input
      v-bind="$attrs"
      ref="input"
      :type="type"
      css="form-control type-ahead-select taller"
      :placeholder="placeholder"
      :name="name"
      :rules="rules"
      autocomplete="off"
      focus="true"
      v-model="query"
      @down="down"
      @up="up"
      @select="select"
      @reset="reset"
      @input="update($event)"
    />
    <div class="typeahead-dropdown-container" v-if="showResult">
      <ul
        v-show="hasItems"
        class="dropdown-menu-list dropdown-menu"
        role="menu"
        aria-labelledby="dropdownMenu"
      >
        <li
          v-for="(item, index) in currentItems"
          :class="{ active: activeClass(index) }"
          :key="'li' + index"
          @click.prevent="select"
          @mousemove="setActive(index)"
        >
          <a v-html="highlighting(item, vue)"></a>
        </li>
      </ul>
      <ul
        v-if="showSearchingFlag"
        v-show="!hasItems"
        class="dropdown-menu dropdown-menu-list"
        role="menu"
        aria-labelledby="dropdownMenu"
      >
        <li class="active" v-if="!loading">
          <a>
            <span v-html="noResultText"></span>
          </a>
        </li>
        <li class="active" v-else>
          <a>
            <span v-html="searchingText"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// Adapted from: https://github.com/mizuka-wu/vue2-typeahead
import { Component, Vue, Ref, Prop, Watch } from "vue-property-decorator";
import vClickOutside from "v-click-outside";
import ValidInput from "./validation/valid-input.vue";

function escapeRegExp(str) {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
@Component({
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    ValidInput,
  },
})
export default class TypeAhead extends Vue {
  query = "";
  current = -1;
  loading = false;
  lastTime = 0;
  data = [];
  showResult = false;

  @Ref() readonly input!: HTMLInputElement;

  @Prop({ default: false })
  selectFirst!: boolean;

  @Prop({ default: 10 })
  limit!: number;

  @Prop({ default: 3 })
  minChars!: number;

  @Prop({ default: 500 })
  delayTime!: number;

  @Prop()
  placeholder!: string;

  @Prop({ default: true })
  showSearchingFlag!: boolean;

  @Prop({ default: "No results" })
  noResultText!: string;

  @Prop({ default: "Searching..." })
  searchingText!: string;

  @Prop()
  classes!: string;

  //TODO: @VModel
  @Prop({ default: "" })
  value!: string;

  @Prop()
  onSelect!: Function;

  @Prop()
  render!: Function;

  @Prop()
  items!: Array<object>;

  currentItems!: Array<object>;

  @Prop()
  rules!: string;

  @Prop({ default: "text" })
  type!: string;

  @Prop()
  name: string;

  @Prop({ default: "name" })
  queryPropertyName!: string;

  mounted() {
    this.query = this.value;

    if (this.items) {
      this.currentItems = this.items.sort();
    }
    console.log(this.currentItems);
  }

  @Watch("value")
  onValueChanged(value) {
    this.query = this.query !== value ? value : this.query;
  }

  @Watch("query")
  onQueryChanged(value) {
    this.$emit("input", value);
  }

  get vue() {
    return this;
  }

  get hasItems() {
    return this.currentItems.length > 0;
  }

  get isEmpty() {
    return this.query === "";
  }

  renderFunc(items) {
    return items;
  }

  highlighting(item, instance) {
    // console.log(item);
    // console.log(instance);
    if (item !== undefined && instance !== undefined) {
      var re = new RegExp(escapeRegExp(instance.query), "ig");

      let matches: any;

      if (typeof item === "object") {
        matches = item[this.queryPropertyName].match(re);
      } else {
        matches = item.match(re);
      }

      matches &&
        matches.forEach((match) => {
          if (typeof item === "object") {
            item = item[this.queryPropertyName].replace(
              match,
              `<b>${match}</b>`
            );
          } else {
            item = item.replace(match, `<b>${match}</b>`);
          }
        });
    }

    return item;
  }

  static onSelectFunc(item, instance) {
    console.log("onSelectFunc");
    console.log(item);
    if (typeof item === "object") {
      instance.query = item[instance.queryPropertyName];
    } else {
      instance.query = item;
    }
  }

  select() {
    if (this.current !== -1) {
      const item = this.currentItems[this.current];
      const select = this.onSelect ? this.onSelect : TypeAhead.onSelectFunc;
      select(item, this);
    }
    this.reset(false);
  }

  //TODO: rename to filterItemsUsingQuery
  objectUpdate() {
    var filtered = this.currentItems.filter((entity) => {
      if (typeof entity === "object") {
        return entity[this.queryPropertyName]
          .toLowerCase()
          .includes(this.query.toLowerCase());
      } else {
        return (entity as any).toLowerCase().includes(this.query.toLowerCase());
      }
    });

    //TODO: refactor.... should be able to remove this.data
    this.data = this.limit ? filtered.slice(0, this.limit) : filtered;

    const render = this.render ? this.render : this.renderFunc;

    this.currentItems = render(
      this.limit ? this.data.slice(0, this.limit) : this.data,
      this
    );

    this.current = -1;

    if (this.selectFirst) {
      this.down();
    }
  }

  update(input: string) {
    console.log(input);
    const eventTimeStamp = event.timeStamp ?? Date.now();
    this.lastTime = eventTimeStamp;
    if (!this.query) {
      this.reset();
      //TODO: refactor... code smell...
      return;
    }

    if (this.minChars && this.query.length < this.minChars) {
      return;
    }

    setTimeout(() => {
      if (this.lastTime - eventTimeStamp === 0) {
        this.loading = true;
        this.showResult = true;

        //TODO: refactor to make this async
        this.objectUpdate();

        this.current = -1;
        this.loading = false;

        if (this.selectFirst) {
          this.down();
        }
      }
    }, this.delayTime);
  }

  setActive(index) {
    this.current = index;
  }

  activeClass(index) {
    return this.current === index;
  }

  up() {
    if (this.current > 0) {
      this.current--;
    } else if (this.current === -1) {
      this.current = this.items.length - 1;
    } else {
      this.current = -1;
    }
    if (!this.selectFirst && this.current !== -1) {
      this.setActive(this.current);
    }
  }

  down() {
    if (this.current < this.items.length - 1) {
      this.current++;
    } else {
      this.current = -1;
    }
    if (!this.selectFirst && this.current !== -1) {
      this.setActive(this.current);
    }
  }

  reset(emit: boolean = true) {
    // this.currentItems = [];
    this.currentItems = this.items.sort();
    this.loading = false;
    this.showResult = false;
    if (emit) {
      this.$emit("reset", this);
    }
  }
}
</script>

<style scoped>
.dropdown-menu-list {
  display: list-item;
  width: 100%;
}

.typeahead-dropdown-container {
  position: relative;
  width: 100%;
}

div.input-group input.form-control.type-ahead-select {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

ul li {
  padding: 5px 0.5rem;
  margin: 0px 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  cursor: pointer;
}

ul li.active {
  background-color: #f1f2f3;
}
</style>