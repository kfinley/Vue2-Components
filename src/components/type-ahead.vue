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
      :focus="focus"
      v-model="query"
      @down="down"
      @up="up"
      @select="select"
      @reset="reset"
      @input="update($event)"
      v-on:focus="$emit('focus')"
      v-on:focusin="$emit('focusin')"
      v-on:focusout="$emit('focusout')"
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
          :class="{ active: isActive(index) }"
          :key="'li' + index"
          @click.prevent="select(index)"
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
//ht: Adapted from https://github.com/mizuka-wu/vue2-typeahead
import { Component, Vue, Ref, Prop, Emit, Watch } from "vue-property-decorator";
import vClickOutside from "v-click-outside";
import ValidInput from "./validation/valid-input.vue";
import { search } from "../search";

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
  queries: Array<string> = [];

  current = -1;
  loading = false;
  lastTime = 0;
  data = [];
  showResult = false;

  @Ref() readonly input!: HTMLInputElement;

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

  //TODO: investigate. @VModel doesn't seem to work well here. Watch never fires
  @Prop({ default: "" })
  value!: Record<string, any> | string;

  @Prop()
  onSelect!: (item: Record<string, any> | string) => void;

  @Prop()
  render!: Function;

  @Prop()
  items!: Array<Record<string, any> | string>;

  currentItems!: Array<Record<string, any> | string>;

  @Prop()
  rules!: string;

  @Prop({ default: "text" })
  type!: string;

  @Prop()
  name: string;

  //TODO: refactor / rename...
  @Prop({ default: "name" })
  queryPropertyName!: string;

  @Prop({ default: true })
  focus!: boolean;

  mounted() {
    if (typeof this.value === "object") {
      this.query = this.value[this.queryPropertyName];
    } else {
      this.query = this.value;
    }

    this.setCurrentItems();

    //console.log(this.currentItems);
  }

  setCurrentItems() {
    this.currentItems = this.items;
  }

  @Watch("items")
  onItemsChanged() {
    // console.log("items changed");
    this.setCurrentItems();
  }

  @Watch("value")
  onValueChanged(n) {
    console.log("value changed...");

    // console.log(n);
    // console.log(o);
    //TODO: refactor... can be simplified
    if (typeof this.value === "object") {
      this.query =
        this.query !== n[this.queryPropertyName]
          ? n[this.queryPropertyName]
          : this.query;
    } else {
      this.query = this.query !== n ? n : this.query;
    }
    console.log(this.query);
  }

  @Watch("query")
  @Emit("input")
  onQueryChanged() {}

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

  //TODO: rename. This method handles what is displayed in the result list. It's evolved to more than just highlighting at this point..
  highlighting(item, instance) {
    // console.log(item);
    // console.log(instance);

    if (item !== undefined && instance !== undefined) {
      // console.log(search(item, instance.query));

      var regEx = new RegExp(escapeRegExp(instance.query), "gi");

      let matches: any;

      const searchResult = search(item, instance.query);

      if (typeof item === "object") {
        matches = searchResult.match(regEx);
        // matches = item[this.queryPropertyName].match(regEx);
      } else {
        matches = item.match(regEx);
      }

      matches &&
        matches.forEach((match) => {
          if (typeof item === "object") {
//            console.log("object");
            if (search(item[this.queryPropertyName], instance.query) == false) {
              item = `${
                item[this.queryPropertyName]
              }<br/>${searchResult.replace(match, `<i><b>${match}</b></i>`)}`; //?
            } else {
              item = item[this.queryPropertyName].replace(match, `<b>${match}</b>`);
            }
          } else {
          //  console.log("not object");
            item = item.replace(match, `<b>${match}</b>`);
          }
        });
      // matches &&

      //const foo = search(item, instance.query);
      //console.log(foo);

      // if (typeof foo === "object") {
      //   if (search(item[this.queryPropertyName], instance.query) == false) {
      //     console.log("term found in property");

      //   } else {
      //     var regEx = new RegExp(escapeRegExp(instance.query), "gi");
      //     const matches = item[this.queryPropertyName].match(regEx);
      //     matches.forEach((match) => {
      //       item = foo[this.queryPropertyName].replace(
      //         match,
      //         `<b>${match}</b>`
      //       );
      //     });
      //   }

      //   //console.log(search(item[this.queryPropertyName], instance.query));

      //   // item = foo[this.queryPropertyName].replace(match, `<b>${match}</b>`);
      // } else {
      //   console.log("not object");
      //   const match = item.match(
      //     new RegExp(escapeRegExp(instance.query), "gi")
      //   );
      //   item = item.replace(match, `<b>${match}</b>`);
      // }
      // });
    }

    return item;
  }

  isActive(index) {
    return this.current === index;
  }

  updateQuery(item) {
    // console.log(item);
    if (typeof item === "object") {
      this.query = item[this.queryPropertyName];
    } else {
      this.query = item;
    }
  }

  select(index) {
    this.current = index;
    if (this.currentItems && this.current !== -1) {
      const item = this.currentItems[this.current];

      this.onSelect && this.onSelect(item);
      this.updateQuery(item);
      this.$emit("select", item);
      this.queries.push(this.query);
      // console.log(item);
    }
    this.reset(false);
  }

  //TODO: rename to filterItemsUsingQuery
  objectUpdate() {
    // console.log(this.currentItems);

    var filtered = search(this.currentItems, this.query).filter((e) => {
      if (typeof e === "object") {
        return e[this.queryPropertyName];
      }
      return e;
    });

    if (filtered) {
      //TODO: refactor.... should be able to remove this.data
      this.data = this.limit ? filtered.slice(0, this.limit) : filtered;

      const render = this.render ? this.render : this.renderFunc;
      // console.log(this.data);

      this.currentItems = render(
        this.limit ? this.data.slice(0, this.limit) : this.data,
        this
      );

      // console.log(this.currentItems);
      this.current = -1;
    }
  }

  // TODO: Code comments left for now... cleanup soon
  // @Emit("update") // Not using @Emit b/c we want to conditionally emit and it doesn't support that.
  update(input: string) {
    // Debugging code intentionally left in place....
    //console.log(input);

    const eventTimeStamp = Date.now(); // event.timeStamp ?? Date.now();
    this.lastTime = eventTimeStamp;
    if (!this.query) {
      // this.reset();
      this.loading = false;
      this.showResult = false;
      // this.showResult = false;
      //TODO: refactor... code smell...
      // return;
    }

    if (this.minChars && this.query.length >= this.minChars) {
      // console.log("creating promise");
      const promise = new Promise((resolve) => {
        // console.log('running promise');
        setTimeout(() => {
          // console.log('running timeout');
          if (this.lastTime - eventTimeStamp === 0) {
            // console.log('running objectUpdate');

            this.loading = true;
            this.showResult = true;

            //TODO: refactor to make this async
            this.objectUpdate();

            this.current = -1;
            this.loading = false;
          }
          // console.log('resolving');

          resolve(input);
          // resolve(this.$emit("update", input);
        }, this.delayTime);
      });
      promise.then((value) => {
        // console.log("emitting update");
        this.$emit("update", value);
      });
    }
    //  else {
    //   console.log("no promise");
    // }
  }

  setActive(index) {
    this.current = index;
  }

  up() {
    console.log("up");
    if (this.current > 0) {
      this.current--;
    } else if (this.current === -1) {
      this.current = this.items.length - 1;
    } else {
      this.current = -1;
    }
  }

  down() {
    console.log("down");
    if (this.current < this.items.length - 1) {
      this.current++;
    } else {
      this.current = -1;
    }
    //console.log(this.current);
  }

  reset(emit: boolean = true) {
    this.currentItems = this.items.sort();
    this.loading = false;
    this.showResult = false;
    //this.query = "";
    if (emit) {
      this.$emit("reset", this);
    }
  }

  log(text) {
    console.log(text);
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
