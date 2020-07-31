(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MPlacement": {
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.menu.Layout": {
        "construct": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      },
      "qx.ui.menu.Separator": {},
      "qx.ui.menu.Manager": {},
      "qx.ui.menu.AbstractButton": {},
      "qx.ui.menu.MenuSlideBar": {},
      "qx.ui.layout.Grow": {},
      "qx.lang.Array": {},
      "qx.ui.core.queue.Widget": {},
      "qx.core.ObjectRegistry": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The menu is a popup like control which supports buttons. It comes
   * with full keyboard navigation and an improved timeout based pointer
   * control behavior.
   *
   * This class is the container for all derived instances of
   * {@link qx.ui.menu.AbstractButton}.
   *
   * @childControl slidebar {qx.ui.menu.MenuSlideBar} shows a slidebar to easily navigate inside the menu (if too little space is left)
   */
  qx.Class.define("qx.ui.menu.Menu", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MPlacement, qx.ui.core.MRemoteChildrenHandling],
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this); // Use hard coded layout

      this._setLayout(new qx.ui.menu.Layout()); // Automatically add to application's root


      var root = this.getApplicationRoot();
      root.add(this); // Register pointer listeners

      this.addListener("pointerover", this._onPointerOver);
      this.addListener("pointerout", this._onPointerOut); // add resize listener

      this.addListener("resize", this._onResize, this);
      root.addListener("resize", this._onResize, this);
      this._blocker = new qx.ui.core.Blocker(root); // Initialize properties

      this.initVisibility();
      this.initKeepFocus();
      this.initKeepActive();
    },
    properties: {
      /*
      ---------------------------------------------------------------------------
        WIDGET PROPERTIES
      ---------------------------------------------------------------------------
      */
      // overridden
      appearance: {
        refine: true,
        init: "menu"
      },
      // overridden
      allowGrowX: {
        refine: true,
        init: false
      },
      // overridden
      allowGrowY: {
        refine: true,
        init: false
      },
      // overridden
      visibility: {
        refine: true,
        init: "excluded"
      },
      // overridden
      keepFocus: {
        refine: true,
        init: true
      },
      // overridden
      keepActive: {
        refine: true,
        init: true
      },

      /*
      ---------------------------------------------------------------------------
        STYLE OPTIONS
      ---------------------------------------------------------------------------
      */

      /** The spacing between each cell of the menu buttons */
      spacingX: {
        check: "Integer",
        apply: "_applySpacingX",
        init: 0,
        themeable: true
      },

      /** The spacing between each menu button */
      spacingY: {
        check: "Integer",
        apply: "_applySpacingY",
        init: 0,
        themeable: true
      },

      /**
      * Default icon column width if no icons are rendered.
      * This property is ignored as soon as an icon is present.
      */
      iconColumnWidth: {
        check: "Integer",
        init: 0,
        themeable: true,
        apply: "_applyIconColumnWidth"
      },

      /** Default arrow column width if no sub menus are rendered */
      arrowColumnWidth: {
        check: "Integer",
        init: 0,
        themeable: true,
        apply: "_applyArrowColumnWidth"
      },

      /**
       * Color of the blocker
       */
      blockerColor: {
        check: "Color",
        init: null,
        nullable: true,
        apply: "_applyBlockerColor",
        themeable: true
      },

      /**
       * Opacity of the blocker
       */
      blockerOpacity: {
        check: "Number",
        init: 1,
        apply: "_applyBlockerOpacity",
        themeable: true
      },

      /*
      ---------------------------------------------------------------------------
        FUNCTIONALITY PROPERTIES
      ---------------------------------------------------------------------------
      */

      /** The currently selected button */
      selectedButton: {
        check: "qx.ui.core.Widget",
        nullable: true,
        apply: "_applySelectedButton"
      },

      /** The currently opened button (sub menu is visible) */
      openedButton: {
        check: "qx.ui.core.Widget",
        nullable: true,
        apply: "_applyOpenedButton"
      },

      /** Widget that opened the menu */
      opener: {
        check: "qx.ui.core.Widget",
        nullable: true
      },

      /*
      ---------------------------------------------------------------------------
        BEHAVIOR PROPERTIES
      ---------------------------------------------------------------------------
      */

      /** Interval in ms after which sub menus should be opened */
      openInterval: {
        check: "Integer",
        themeable: true,
        init: 250,
        apply: "_applyOpenInterval"
      },

      /** Interval in ms after which sub menus should be closed  */
      closeInterval: {
        check: "Integer",
        themeable: true,
        init: 250,
        apply: "_applyCloseInterval"
      },

      /** Blocks the background if value is <code>true<code> */
      blockBackground: {
        check: "Boolean",
        themeable: true,
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_52_0: null,
      __P_52_1: null,

      /** @type {qx.ui.core.Blocker} blocker for background blocking */
      _blocker: null,

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Opens the menu and configures the opener
       */
      open: function open() {
        if (this.getOpener() != null) {
          var isPlaced = this.placeToWidget(this.getOpener(), true);

          if (isPlaced) {
            this.__P_52_2();

            this.show();
            this._placementTarget = this.getOpener();
          } else {
            this.warn("Could not open menu instance because 'opener' widget is not visible");
          }
        } else {
          this.warn("The menu instance needs a configured 'opener' widget!");
        }
      },

      /**
       * Opens the menu at the pointer position
       *
       * @param e {qx.event.type.Pointer} Pointer event to align to
       */
      openAtPointer: function openAtPointer(e) {
        this.placeToPointer(e);

        this.__P_52_2();

        this.show();
        this._placementTarget = {
          left: e.getDocumentLeft(),
          top: e.getDocumentTop()
        };
      },

      /**
       * Opens the menu in relation to the given point
       *
       * @param point {Map} Coordinate of any point with the keys <code>left</code>
       *   and <code>top</code>.
       */
      openAtPoint: function openAtPoint(point) {
        this.placeToPoint(point);

        this.__P_52_2();

        this.show();
        this._placementTarget = point;
      },

      /**
       * Convenience method to add a separator to the menu
       */
      addSeparator: function addSeparator() {
        this.add(new qx.ui.menu.Separator());
      },

      /**
       * Returns the column sizes detected during the pre-layout phase
       *
       * @return {Array} List of all column widths
       */
      getColumnSizes: function getColumnSizes() {
        return this._getMenuLayout().getColumnSizes();
      },

      /**
       * Return all selectable menu items.
       *
       * @return {qx.ui.core.Widget[]} selectable widgets
       */
      getSelectables: function getSelectables() {
        var result = [];
        var children = this.getChildren();

        for (var i = 0; i < children.length; i++) {
          if (children[i].isEnabled()) {
            result.push(children[i]);
          }
        }

        return result;
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyIconColumnWidth: function _applyIconColumnWidth(value, old) {
        this._getMenuLayout().setIconColumnWidth(value);
      },
      // property apply
      _applyArrowColumnWidth: function _applyArrowColumnWidth(value, old) {
        this._getMenuLayout().setArrowColumnWidth(value);
      },
      // property apply
      _applySpacingX: function _applySpacingX(value, old) {
        this._getMenuLayout().setColumnSpacing(value);
      },
      // property apply
      _applySpacingY: function _applySpacingY(value, old) {
        this._getMenuLayout().setSpacing(value);
      },
      // overridden
      _applyVisibility: function _applyVisibility(value, old) {
        qx.ui.menu.Menu.prototype._applyVisibility.base.call(this, value, old);

        var mgr = qx.ui.menu.Manager.getInstance();

        if (value === "visible") {
          // Register to manager (zIndex handling etc.)
          mgr.add(this); // Mark opened in parent menu

          var parentMenu = this.getParentMenu();

          if (parentMenu) {
            parentMenu.setOpenedButton(this.getOpener());
          }
        } else if (old === "visible") {
          // Deregister from manager (zIndex handling etc.)
          mgr.remove(this); // Unmark opened in parent menu

          var parentMenu = this.getParentMenu();

          if (parentMenu && parentMenu.getOpenedButton() == this.getOpener()) {
            parentMenu.resetOpenedButton();
          } // Clear properties


          this.resetOpenedButton();
          this.resetSelectedButton();
        }

        this.__P_52_3();
      },

      /**
       * Updates the blocker's visibility
       */
      __P_52_3: function __P_52_3() {
        if (this.isVisible()) {
          if (this.getBlockBackground()) {
            var zIndex = this.getZIndex();

            this._blocker.blockContent(zIndex - 1);
          }
        } else {
          if (this._blocker.isBlocked()) {
            this._blocker.unblock();
          }
        }
      },

      /**
       * Get the parent menu. Returns <code>null</code> if the menu doesn't have a
       * parent menu.
       *
       * @return {qx.ui.core.Widget|null} The parent menu.
       */
      getParentMenu: function getParentMenu() {
        var widget = this.getOpener();

        if (!widget || !(widget instanceof qx.ui.menu.AbstractButton)) {
          return null;
        }

        if (widget && widget.getContextMenu() === this) {
          return null;
        }

        while (widget && !(widget instanceof qx.ui.menu.Menu)) {
          widget = widget.getLayoutParent();
        }

        return widget;
      },
      // property apply
      _applySelectedButton: function _applySelectedButton(value, old) {
        if (old) {
          old.removeState("selected");
        }

        if (value) {
          value.addState("selected");
        }
      },
      // property apply
      _applyOpenedButton: function _applyOpenedButton(value, old) {
        if (old && old.getMenu()) {
          old.getMenu().exclude();
        }

        if (value) {
          value.getMenu().open();
        }
      },
      // property apply
      _applyBlockerColor: function _applyBlockerColor(value, old) {
        this._blocker.setColor(value);
      },
      // property apply
      _applyBlockerOpacity: function _applyBlockerOpacity(value, old) {
        this._blocker.setOpacity(value);
      },

      /*
      ---------------------------------------------------------------------------
      SCROLLING SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      getChildrenContainer: function getChildrenContainer() {
        return this.getChildControl("slidebar", true) || this;
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "slidebar":
            var control = new qx.ui.menu.MenuSlideBar();

            var layout = this._getLayout();

            this._setLayout(new qx.ui.layout.Grow());

            var slidebarLayout = control.getLayout();
            control.setLayout(layout);
            slidebarLayout.dispose();
            var children = qx.lang.Array.clone(this.getChildren());

            for (var i = 0; i < children.length; i++) {
              control.add(children[i]);
            }

            this.removeListener("resize", this._onResize, this);
            control.getChildrenContainer().addListener("resize", this._onResize, this);

            this._add(control);

            break;
        }

        return control || qx.ui.menu.Menu.prototype._createChildControlImpl.base.call(this, id);
      },

      /**
       * Get the menu layout manager
       *
       * @return {qx.ui.layout.Abstract} The menu layout manager
       */
      _getMenuLayout: function _getMenuLayout() {
        if (this.hasChildControl("slidebar")) {
          return this.getChildControl("slidebar").getChildrenContainer().getLayout();
        } else {
          return this._getLayout();
        }
      },

      /**
       * Get the menu bounds
       *
       * @return {Map} The menu bounds
       */
      _getMenuBounds: function _getMenuBounds() {
        if (this.hasChildControl("slidebar")) {
          return this.getChildControl("slidebar").getChildrenContainer().getBounds();
        } else {
          return this.getBounds();
        }
      },

      /**
       * Computes the size of the menu. This method is used by the
       * {@link qx.ui.core.MPlacement} mixin.
       * @return {Map} The menu bounds
       */
      _computePlacementSize: function _computePlacementSize() {
        return this._getMenuBounds();
      },

      /**
       * Updates the visibility of the slidebar based on the menu's current size
       * and position.
       */
      __P_52_2: function __P_52_2() {
        var menuBounds = this._getMenuBounds();

        if (!menuBounds) {
          this.addListenerOnce("resize", this.__P_52_2, this);
          return;
        }

        var rootHeight = this.getLayoutParent().getBounds().height;
        var top = this.getLayoutProperties().top;
        var left = this.getLayoutProperties().left; // Adding the slidebar must be deferred because this call can happen
        // during the layout flush, which make it impossible to move existing
        // layout to the slidebar

        if (top < 0) {
          this._assertSlideBar(function () {
            this.setHeight(menuBounds.height + top);
            this.moveTo(left, 0);
          });
        } else if (top + menuBounds.height > rootHeight) {
          this._assertSlideBar(function () {
            this.setHeight(rootHeight - top);
          });
        } else {
          this.setHeight(null);
        }
      },

      /**
       * Schedules the addition of the slidebar and calls the given callback
       * after the slidebar has been added.
       *
       * @param callback {Function} the callback to call
       * @return {var|undefined} The return value of the callback if the slidebar
       * already exists, or <code>undefined</code> if it doesn't
       */
      _assertSlideBar: function _assertSlideBar(callback) {
        if (this.hasChildControl("slidebar")) {
          return callback.call(this);
        }

        this.__P_52_1 = callback;
        qx.ui.core.queue.Widget.add(this);
      },
      // overridden
      syncWidget: function syncWidget(jobs) {
        this.getChildControl("slidebar");

        if (this.__P_52_1) {
          this.__P_52_1.call(this);

          delete this.__P_52_1;
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Update position if the menu or the root is resized
       */
      _onResize: function _onResize() {
        if (this.isVisible()) {
          var target = this._placementTarget;

          if (!target) {
            return;
          } else if (target instanceof qx.ui.core.Widget) {
            this.placeToWidget(target, true);
          } else if (target.top !== undefined) {
            this.placeToPoint(target);
          } else {
            throw new Error("Unknown target: " + target);
          }

          this.__P_52_2();
        }
      },

      /**
       * Event listener for pointerover event.
       *
       * @param e {qx.event.type.Pointer} pointerover event
       */
      _onPointerOver: function _onPointerOver(e) {
        // Cache manager
        var mgr = qx.ui.menu.Manager.getInstance(); // Be sure this menu is kept

        mgr.cancelClose(this); // Change selection

        var target = e.getTarget();

        if (target.isEnabled() && target instanceof qx.ui.menu.AbstractButton) {
          // Select button directly
          this.setSelectedButton(target);
          var subMenu = target.getMenu && target.getMenu();

          if (subMenu) {
            subMenu.setOpener(target); // Finally schedule for opening

            mgr.scheduleOpen(subMenu); // Remember scheduled menu for opening

            this.__P_52_0 = subMenu;
          } else {
            var opened = this.getOpenedButton();

            if (opened) {
              mgr.scheduleClose(opened.getMenu());
            }

            if (this.__P_52_0) {
              mgr.cancelOpen(this.__P_52_0);
              this.__P_52_0 = null;
            }
          }
        } else if (!this.getOpenedButton()) {
          // When no button is opened reset the selection
          // Otherwise keep it
          this.resetSelectedButton();
        }
      },

      /**
       * Event listener for pointerout event.
       *
       * @param e {qx.event.type.Pointer} pointerout event
       */
      _onPointerOut: function _onPointerOut(e) {
        // Cache manager
        var mgr = qx.ui.menu.Manager.getInstance(); // Detect whether the related target is out of the menu

        if (!qx.ui.core.Widget.contains(this, e.getRelatedTarget())) {
          // Update selected property
          // Force it to the open sub menu in cases where that is opened
          // Otherwise reset it. Menus which are left by the cursor should
          // not show any selection.
          var opened = this.getOpenedButton();
          opened ? this.setSelectedButton(opened) : this.resetSelectedButton(); // Cancel a pending close request for the currently
          // opened sub menu

          if (opened) {
            mgr.cancelClose(opened.getMenu());
          } // When leaving this menu to the outside, stop
          // all pending requests to open any other sub menu


          if (this.__P_52_0) {
            mgr.cancelOpen(this.__P_52_0);
          }
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (!qx.core.ObjectRegistry.inShutDown) {
        qx.ui.menu.Manager.getInstance().remove(this);
      }

      this.getApplicationRoot().removeListener("resize", this._onResize, this);
      this._placementTarget = null;

      this._disposeObjects("_blocker");
    }
  });
  qx.ui.menu.Menu.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Menu.js.map?dt=1596197905504