OKnesset.app.controllers.Party = Ext.regController('Party', {

	// index action
	Index: function(options)
	{
		var memberList, id , party, name, info, infoView;
		if ( ! this.partyView)
		{
			this.partyView = this.render({
				xtype: 'PartyView'
			});
			memberList = this.partyView.query('#MemberList')[0];
			memberList.addListener('itemtap',
				function(that, index, item, e) {
					var record = that.store.getAt(index);
					OKnesset.app.controllers.navigation.dispatchPanel('Member/Index/' + record.data.id, options.historyUrl);
			});
			this.partyView.query('#Button')[0].addListener('tap',
				function(that, index, item, e) {
					if (that.party_id) {
						OKnesset.app.controllers.navigation.dispatchPanel('PartyInfo/Index/' + that.party_id, options.historyUrl);
					}
			});
		}

		id = parseInt(options.id, 10);
		party = getObjectFromStoreByID(OKnesset.PartyStore, id);
		info = getObjectFromStoreByID(OKnesset.PartyInfoStore, id, 'party_id');

		name = party.data.name;

		// don't track if the panal was reached by pressing 'back'
		if (options.pushed){
			GATrackPage('PartyView', name);
		}

		this.filterMembersByParty(party);

		// in case the member list was scrolled down( because the user viewed the
		// panel for another member)
		if (options.pushed){
			if (this.partyView.scroller) {
				this.partyView.scroller.scrollTo({
					x : 0,
					y : 0
				});
			}
		}
		this.partyView.query('#MiniText')[0].update(info && info.data || {});
		this.partyView.query('#Button')[0].party_id = info && info.data.party_id;
		this.application.viewport.query('#toolbar')[0].setTitle(name);
		this.application.viewport.setActiveItem(this.partyView, options.animation);
	},

	getIdFromAbsoluteUrl: function(url){
		var sub1 = url.substr("/party/".length);
		return sub1.substr(0,sub1.indexOf('/'));
	},

	getNameById : function(partyId){
		var party = getObjectFromStoreByID(OKnesset.PartyStore, partyId);
		if (typeof party === 'undefined') {
			OKnesset.log("Cannot find party from id '" + partyId + "'");
			return "";
		}
		
		return party.data.name;
	},
	isInCoalitionById : function(partyId){
		var party = getObjectFromStoreByID(OKnesset.PartyStore, partyId);
		if (typeof party === 'undefined') {
			OKnesset.log("Cannot find party from id '" + partyId + "'");
			return "";
		}
		
		return party.data.is_coalition;
	},

	filterMembersByParty : function(party) {
		OKnesset.MemberStore.clearFilter(true);
		OKnesset.MemberStore.filter({
			property: 'party_id',
			exactMatch : true,
			value : party.data.id});
	},

	navigateToParty: function(partyId){
		OKnesset.app.controllers.navigation.dispatchPanel('Party/Index/' + partyId, "");
	}
});