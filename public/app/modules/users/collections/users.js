define([
	'app/common/baseCollection',
	'app/modules/users/models/user'
], function(BaseCollection, UserModel) {

	// UserCollection, es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
	var UsersCollection = BaseCollection.extend({
		model: UserModel,
		url: '/users'
	});

	return UsersCollection;
});