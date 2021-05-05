import makeObservable from "./observable.js";
import dispatcher from "./dispatcher.js";

class Component {
    constructor(template, props = {}) {
        this.events = {};
        this._childrenInfo = {};
        this._childrenInstances = [];
        this.template = template;
        this.element = null;

        this.state = {};
        this.props = props;
    }

    updateState(updater) {
        this.setState(updater);
        this._reRender();
    }

    setState(updater) {
        for (const [key, value] of Object.entries(updater)) {
            if (value !== undefined) {
                this.state[key] = value;
            }
        }
    }

    renderTo(element, position = 'afterbegin') {
        element.insertAdjacentElement(position, this.render());
        return this.element;
    }

    render() {
        const renderedElement = document.createElement('template');
        renderedElement.innerHTML = this.template(this.state);
        this.element = renderedElement.content.firstChild;

        this.addEventListeners();
        this.renderChildren();

        return this.element;
    }

    _reRender() {
        if (!this.element) {
            return;
        }

        const tempElement = document.createElement('temp');
        this.element.insertAdjacentElement('beforebegin', tempElement);
        this.hide();
        this.renderTo(tempElement, 'beforebegin');
        tempElement.remove();
    }

    renderChildren() {
        const components = Array.from(this.element.getElementsByTagName('component'));
        components.forEach(childPlaceElement => {
            const additionalProps = {};

            const attrs = Array.from(childPlaceElement.attributes);
            let componentName = null;
            attrs.forEach(({name, value}) => {
                switch (name) {
                    case 'name':
                        componentName = value;
                        break;

                    case 'props':
                        Object.assign(additionalProps, JSON.parse(value));
                        break;

                    default:
                        additionalProps[name] = value;
                }
            });

            const childProps = this._childrenInfo[componentName].props;
            Object.assign(childProps, additionalProps);

            const ChildComponent = this._childrenInfo[componentName].componentClass;
            const childComponent = new ChildComponent(childProps);
            this._childrenInstances.push(childComponent);

            const renderedChild = childComponent.render();
            childPlaceElement.insertAdjacentElement('beforebegin', renderedChild);

            childPlaceElement.remove();
        });
    }

    addEventListeners() {
        for (const [event, listeners] of Object.entries(this.events)) {
            listeners.forEach(
                ({callback, getElement}) => {
                    if (!getElement()) {
                        return;
                    }

                    getElement().addEventListener(event, callback);
                }
            );
        }
    }

    hide() {
        if (!this.element) {
            return;
        }

        this.removeEventListeners();

        this._childrenInstances.forEach(childComponent => childComponent.hide());

        this.element.remove();
        this.element = null;
        this.data = null;
    }

    removeEventListeners() {
        for (const [event, listeners] of Object.entries(this.events)) {
            listeners.forEach(
                ({callback, getElement}) => {
                    if (!getElement()) {
                        return;
                    }

                    getElement().removeEventListener(event, callback)
                }
            );
        }
    }

    registerChildComponent(childName, ComponentClass, props = {}) {
        this._childrenInfo[childName] = {componentClass: ComponentClass, props};
    }

    registerElementEvent(eventName, callback, getElement = () => this.element) {
        if (this.events[eventName] === undefined) {
            this.events[eventName] = [];
        }

        this.events[eventName].push({
            'callback': callback.bind(this),
            'getElement': getElement.bind(this)
        });
    }

    dispatchUserAction(type, data = {}) {
        dispatcher.dispatch({type, data});
    }

    allowed() {
        return true;
    }
}

makeObservable(Component);

export {Component};
