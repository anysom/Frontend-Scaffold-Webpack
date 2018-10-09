﻿'use strict';

import foreach from 'lodash/foreach';
import ExampleComponent from '../components/example-component.js';

export default class ComponentRepository {

    constructor() {
        this.components = {
            'example-component': ExampleComponent
        };

        this.loadedComponents = [];

        this.globalInstances = {}; // This will hold components with a data-component-id, that can be queried globally
    }

    // Loads all controllers
    load() {
        foreach(document.querySelectorAll('[data-component]'), function (c) {
            var componentKey = c.getAttribute('data-component');
            var componentId = c.getAttribute('data-component-id');
            var Component = this.components[componentKey];
            if (Component) {
                let newComponentInstance = new Component(c)
                this.loadedComponents.push(newComponentInstance);

                // If the component has a component ID, add it to globalInstances
                if (componentId) {
                    this.globalInstances[componentId] = newComponentInstance;
                }
            } else {
                console.warn('unable to find component: ', componentKey);
            }
        }.bind(this));
    }

    /**
     * Gets a specific instance of a component, based on its ID.
     */
    getInstance(instanceId) {
        if (instanceId) {
            return this.globalInstances[instanceId];
        }
    }
}
