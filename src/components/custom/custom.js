import RoleComponent from './components/Role/RoleComponent'
import TourComponent from './components/Tour/TourComponent'
import UserComponent from './components/User/UserComponent'
import TourTypeComponent from './components/TourType/TourTypeComponent'

export const rowCustoms = {
	roles: [
		{
			icon: 'fa fa-cog',
			label: '',
			component: RoleComponent,
		}
	],
	users: [
		{
			icon: 'fa fa-lock',
			label: '',
			component: UserComponent,
		}
	],
	tour_types: [
		{
			icon: 'fa fa-cog',
			label: '',
			component: TourTypeComponent,
		}
	],
}

export const tableCustoms = {
	// roles: [
	// 	{
	// 		icon: 'fa fa-cog',
	// 		label: '',
	// 		component: RoleComponent,
	// 	}
	// ],
}

export const customModes = {
	tours: {
		cc: TourComponent,
		// cv:
		// ce:
		// cd:
	},
}