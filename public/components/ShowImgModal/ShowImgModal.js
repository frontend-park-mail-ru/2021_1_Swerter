import {Component} from "../../modules/Component.js";

export class ShowImgModal extends Component {
    constructor(props) {
        super(showimgmodalTemplate, props);

        this.state = {
            images: this.props.images,
            currentIndex: +this.props.selected
        };

        this.registerElementEvent('click', this.onClose, this.getCloseDivElement);
        this.registerElementEvent('click', this.onClose, this.getCloseButtonElement);
        this.registerElementEvent('click', this.onNextImage, this.getNextImageButtonElement);
        this.registerElementEvent('click', this.onPreviousImage, this.getPreviousImageButtonElement);
    }

    onClose() {
        this.props.hideThis(this);
    }

    onNextImage() {
        if (this.state.currentIndex < this.state.images.length - 1) {
            this.updateState({currentIndex: this.state.currentIndex + 1});
        } else {
            this.updateState({currentIndex: 0});
        }
    }

    onPreviousImage() {
        if (this.state.currentIndex > 0) {
            this.updateState({currentIndex: this.state.currentIndex - 1});
        } else {
            this.updateState({currentIndex: this.state.images.length - 1});
        }
    }

    getCloseButtonElement() {
        return this.element.getElementsByClassName('btn-close__modal__show-post')[0];
    }

    getCloseDivElement() {
        return this.element.getElementsByClassName('modal-bg-close')[0];
    }

    getNextImageButtonElement() {
        return this.element.getElementsByClassName('go-next-img')[0];
    }

    getPreviousImageButtonElement() {
        return this.element.getElementsByClassName('go-prev-img')[0];
    }
}