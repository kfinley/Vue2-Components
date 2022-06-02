import Vue, { PluginFunction, PluginObject } from "vue";
import * as components from './components';

export interface ComponentsPlugin extends PluginObject<ComponentLibraryPluginOptions> {
    install: PluginFunction<ComponentLibraryPluginOptions>;
}

export interface ComponentLibraryPluginOptions {}


const ComponentLibraryPlugin = {
    install(vue: typeof Vue, options?: ComponentLibraryPluginOptions) {
        Object.keys(components).forEach(name => {
            vue.component(name, (<any>components)[name]);
        });
    }
};

export default ComponentLibraryPlugin;