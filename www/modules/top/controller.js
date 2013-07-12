define([
  'modules/top/viewTop'
], function (TopView) {

	var TopController = {
		getLayout: function () {

			return new TopView();
		}
	};

	return TopController;
});
