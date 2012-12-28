
OKnesset.app.views.AgendaMembersSupportListView = new Ext.extend(Ext.List, {
    id: 'AgendaMembersSupportListView',
    store: OKnesset.AgendaMembersSupportListStore,
    //grouped: true,

    itemTpl :  new Ext.XTemplate('<div class="memberName {[this.classes(values.absolute_url)]}">{name}<div class="supportSize">{score}%</div></div>',
        {
            compiled: true,    		
            classes : function(absolute_url){
                var partyId = OKnesset.app.controllers.Member.getPartyIdFromAbsoluteUrl(absolute_url);
                
               if (typeof partyId === "undefined") {
                   return "";
               }
               return  OKnesset.app.controllers.Party.getPartyClasses(partyId);
            }
        }
	),
    onItemDisclosure: true,
  
});

Ext.reg('AgendaMembersSupportListView', OKnesset.app.views.AgendaMembersSupportListView);
