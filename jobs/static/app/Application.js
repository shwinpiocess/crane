/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Jobs.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Jobs',

    stores: [
        // TODO: add global / shared stores here
    ],

    views: [
        'Jobs.view.login.Login',
        'Jobs.view.main.Main'
    ],
    
    launch: function () {
        // TODO - Launch the application
        var supportsLocalStorage = Ext.supports.LocalStorage,
            loggedIn;

        if (!supportsLocalStorage) {
            Ext.msg.alert('Your Browser Does Not Support Local Storage');
            return
        }

        loggedIn = localStorage.getItem('LoggedIn');

        Ext.widget(loggedIn ? 'app-main' : 'login');
    }
});
