import makeObservable from "../modules/observable.js";

class View {
    events = {};
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
        for (const [event, callback] of Object.entries(this.events)) {
            this.element.addEventListener(event, callback);
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
        for (const [event, callback] of Object.entries(this.events)) {
            this.element.removeEventListener(event, callback);
        }
    }

    addChildren(childName, childComponent) {
        this.children[childName] = new childComponent();
    }
}
makeObservable(View);

export {View};
