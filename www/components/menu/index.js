define([
  'models/menuButton',
  'views/menuButton',
  'views/menu'
], function (MenuButtonModel, MenuButtonView, MenuView) {

	var Menu = {
		getLayout: function () {

			this.view = new MenuView({
				buttonView: MenuButtonView,
				buttonModel: MenuButtonModel
			});
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

	return Menu;
});
