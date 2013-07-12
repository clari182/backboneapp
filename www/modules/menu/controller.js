define([
  'modules/menu/viewMenu'
], function (MenuView) {

	var MenuController = {
		getLayout: function () {

			this.view = new MenuView();
			return this.view;
		},

		addButton: function (conf) {

			if (!!this.view) {
				
				this.view.createButton(conf);
			}
		},

		setSelectedButton: function (data) {

			if (!!this.view) {

				this.view.updateHighligthedItem(data);
			}
		}
	};

	return MenuController;
});
