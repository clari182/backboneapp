define([
	'app/common/baseCollection',
	'app/modules/users/models/user'
], function(BaseCollection, UserModel) {

	var UsersCollection = BaseCollection.extend({
		model: UserModel,
		url: '/users'
	});

	return UsersCollection;
});