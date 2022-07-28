'use babel';

import MenangSlotOnlineView from './menang-slot-online-view';
import { CompositeDisposable } from 'atom';

export default {

  menangSlotOnlineView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.menangSlotOnlineView = new MenangSlotOnlineView(state.menangSlotOnlineViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.menangSlotOnlineView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'menang-slot-online:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.menangSlotOnlineView.destroy();
  },

  serialize() {
    return {
      menangSlotOnlineViewState: this.menangSlotOnlineView.serialize()
    };
  },

  toggle() {
    console.log('MenangSlotOnline was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
