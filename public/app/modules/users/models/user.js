define([
  'app/common/baseModel'
], function (BaseModel) {

  var Movie = BaseModel.extend({
    urlRoot: '/users',

    defaults: {
      _id: undefined,
      name: '',
      lastname: '',
      email: ''
    },

    validate: function (attrs) {
      var year = new Date().getFullYear();

      var error = [];

      if (!attrs.name.trim()) {
        error.push({value: 'name', msj: 'Tenes que ingresar el nombre del usuario'});
      }
      if (!attrs.lastname.trim()) {
        error.push({value: 'lastname', msj: 'Tenes que ingresar el apellido del usuario'});
      }
      if (!attrs.email.trim()) {
        error.push({value: 'email', msj: 'Tenes que ingresar el e-mail del usuario'});
      }

      if (error.length > 0) {
        return error;
      }
    },

    getFullname: function () {
      return this.get('name') + ' ' + this.get('lastname');
    }
  });

  return Movie;
});
