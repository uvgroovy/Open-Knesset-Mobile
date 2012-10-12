Ext.define('OKnesset.app.views.EmailView', {
    extend: 'Ext.Panel',

    config: {
            id: 'EmailView',
            floating: true,
            centered: true,
            cls: 'textCenter',
            styleHtmlContent: true,
            items: [{
                html: OKnesset.strings.emailDialogBody,
                height: "5em"
            }, {
                xtype: 'button',
                id :'generalFeedbackBtn',
                text: OKnesset.strings.emailGeneral
            }, {
                xtype: 'spacer',
                height: "2em"
            }, {
                xtype: 'button',
                id : 'contextButton',
                style: {
                    'font-size': '115%'
                },
            }],
            dockedItems: [{
                docked: 'top',
                xtype: 'toolbar',
                title: OKnesset.strings.emailDialogTitle
            }, {
                docked: 'bottom',
                id : 'cancelEmailBtn',
                xtype: 'button',
                ui: 'decline',
                text: OKnesset.strings.cancel
            }],
        },

    initialize: function() {
        this.callParent(arguments);
        var viewport = Ext.ApplicationManager.get("oknesset").viewport;
        this.width = viewport.getWidth() * 0.9;
        this.height = viewport.getHeight() * 0.65;
    },
});
Ext.reg('EmailView', OKnesset.app.views.EmailView);
