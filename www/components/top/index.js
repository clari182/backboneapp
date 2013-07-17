define([
  'views/top'
], function (TopView) {

	var Top = {
		getLayout: function () {

			return new TopView();
		}
	};

	return Top;
});
