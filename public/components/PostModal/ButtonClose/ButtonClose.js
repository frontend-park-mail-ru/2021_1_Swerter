import {Component} from "../../../modules/Component.js";

const buttonCloseTemplate = () =>
`<div class="btn btn__close">
    <i class="far fa-times-circle fa-2x"></i>
</div>`;

export class ButtonClose extends Component {
    constructor(props) {
        super(buttonCloseTemplate, props);

        this.registerElementEvent('click', this.onClick);
        console.log(this.props);
    }

    onClick() {
        this.props.onClick(this.props['button-id']);
    }

}

