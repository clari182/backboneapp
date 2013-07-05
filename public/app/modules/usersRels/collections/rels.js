define([
	'app/common/baseCollection',
	'app/modules/usersRels/models/usersRels.js'
], function (BaseCollection, UsersRelsModel) {

	var UsersRelsModelCollection = BaseCollection.extend({
		model: UsersRelsModel,
		url: '/usersRels'
	});

	return UsersRelsModelCollection;
});
