define([
	'app/common/eventHandler'
], function (eventHandler) {

	return {
		showCollectionView: function () {

			eventHandler.trigger('users:router:collection');
		},
		showDetailView: function (id) {

			eventHandler.trigger('users:router:detail', id);
		},
		showFormView: function (id) {

			eventHandler.trigger('users:router:form', id);
		}
	};
});
