import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

/*
---------------   Header --------------
@description: Common header panel
*/

const Header = () => (
	<header class={style.header}>
		<h1>Task Manager</h1>
	</header>
);

export default Header;
