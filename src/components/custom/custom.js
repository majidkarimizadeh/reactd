import RoleComponent from './Role/RoleComponent'
import TourComponent from './Tour/TourComponent'
import UserComponent from './User/UserComponent'
import TourTypeComponent from './TourType/TourTypeComponent'

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