import Component from './component'

export default class BigPic extends Component {

	constructor(props) {
		super(props)
	}

	render() {
        const {data} = this.props
        
		return `<div class="item big-image" on:click="aa">
                <h3>
                    ${data.title}
                </h3>
                <div class="big-img">
                    <img src="${data.imageList[0]}" />
                </div>
            </div>`
	}

}