import {Component} from "../../modules/Component";
import './SiteDescription.css';

const siteDescriptionTemplate = () =>
`<div class="site-description">
    <p class="site-description__p-title">Social Network</p>
    <p class="site-description__p-description">Connect people all over the world.</p>
</div>`;

export class SiteDescription extends Component {
    constructor() {
        super(siteDescriptionTemplate);
    }
}