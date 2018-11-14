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
