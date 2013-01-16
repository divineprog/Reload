define([
    'jquery',
    'underscore',
    'backbone',
    'models/project/project',
    'text!../../../templates/index/create_project_dialog.html'
], function($, _, Backbone, ProjectModel, dialogTemplate){

    var CreateProjectDialog = Backbone.View.extend({

        events: {
            'click button#submit': 'submit',
            'click button#close': 'close'
        },

        initialize: function (options) {

            _.bindAll(this, 'render');

            this.project = options.project;

            this.compiledTemplate = _.template( dialogTemplate, {} );
            this.$el = $(this.compiledTemplate);
        },

        submit: function () {

            var type = 'web';
            var rdolist = document.getElementsByName("projectType");
            if (rdolist[1].checked) {
                type = "native";
            }

            var newProjectName = $('#project-name');

            if (newProjectName.val().length !== 0) {

                this.project.set({
                    name: newProjectName.val(),
                    type: type
                });

                this.close();
            } else {
                alert("Please enter a project name.");
            }

        },

        close: function () {

            // Don't remove until transition is complete.
            this.$el.on('hidden', function () {
                this.remove();
            });

            this.$el.modal('hide');
        },

        render: function () {
            this.$el.modal('show');
        }

    });

    return CreateProjectDialog;
});
