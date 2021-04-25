import makeObservable from "../modules/observable.js";

class Component {
    /* 'eventName': {
            'callback': function(event) { ... },
            'getElement': function() {
                return this.element
                    .getElementsByClassName('child element but not component')[0];
            }
    */
    events = {};

    // 'loginButton': Button // class Button extends Component
    children = {};

    constructor(template) {
        this.template = template;
        this.element = null;
        this.data = null;
    }

    render(data = {}) {
        this.data = data;

        const renderedElement = document.createElement('template');
        renderedElement.innerHTML = this.template(data);
        this.element = renderedElement.content.firstChild;

        this.addEventListeners();
        this.renderChildren();

        return this.element;
    }

    renderChildren() {
        for (const [childName, childComponent] of Object.entries(this.children)) {
            const renderedChild = childComponent.render(this.data[childName]);

            const childPlaceElement = this.element.getElementsByClassName(childName)[0];
            childPlaceElement.insertAdjacentElement('beforebegin', renderedChild);
            childPlaceElement.remove();
        }
    }

    addEventListeners() {
        for (const [event, {callback, getElement}] of Object.entries(this.events)) {
            const element = getElement();
            element.addEventListener(event, callback);
        }
    }

    hide() {
        this.removeEventListeners();

        for (const [childName, childComponent] of Object.entries(this.children)) {
            childComponent.hide();
        }

        this.element.remove();
        this.element = null;
        this.data = null;
    }

    removeEventListeners() {
        for (const [event, {callback, getElement}] of Object.entries(this.events)) {
            const element = getElement();
            element.removeEventListener(event, callback);
        }
    }

    addChildren(childName, childComponent) {
        this.children[childName] = new childComponent();
    }

    addEvent(eventName, callback, getElement = () => this.element) {
        this.events[eventName] = {
            'callback': callback.bind(this),
            'getElement': getElement.bind(this)
        };
    }
}
makeObservable(Component);

export {Component};
