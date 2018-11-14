import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Tasks from '../routes/tasks';

/*
---------------   App --------------
@description:
Application default Component
*/

export default class App extends Component {
	
	/** Gets fired when the route changes.
 	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
 	 *	@param {string} event.url	The newly routed URL
 	 */
 	handleRoute = e => {
 		this.currentUrl = e.url;
 	};

     /*
     * @render
     * @description: application render function
     * @param: none
     * @return : rendering HTML snippet
     */
	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Tasks path="/"/>
				</Router>
			</div>
		);
	}
}
