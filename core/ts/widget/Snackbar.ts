/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on:  2020-05-23 18:04:47
 * @ Modified on: 2020-06-25 09:53:46
 * 
 * @version 1.3
 * 
 * The project Snackbar is support of compatibility for web.
 * 
 * This project retake the Snackbar of the application Pexpe (on Google Play Store) who 
 * retake it of my other project (#MaterialThemeSupportSnackbar) {@link https://github.com/MSay2/MaterialThemeSupportSnackbar}
 */

/**
   Copyright (c) 2020 MSay2 - Support-typescript

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { ObjectCastException, IllegalArgumentException } from "../helper/Exceptions.js";
import { Argument } from "../helper/Argument.js";
import { Callable } from "../helper/Callable.js";
import { StringUtils } from "../helper/Utils.js";
import { Component, Message, IMessage } from "../helper/Component.js";
import { OnClickListener } from "../helper/OnClickListener.js";
import { RegularExpressions } from "../helper/RegularExpressions.js";
import { Scrollable } from "../helper/Scrollable.js";

enum DismissEvent
{
    DISMISS_EVENT_ACTION = 1,
    DISMISS_EVENT_TIMEOUT = 2,
    DISMISS_EVENT_MANUAL = 3,
    DISMISS_EVENT_CONSECUTIVE = 4
}

enum Duration
{
    LENGTH_LONG = -1,
    LENGTH_SHORT = -2,
    LENGTH_INDEFINITE = -3
}

/**
 * The Callbbakc interface is a event listener for Snackbar
 * 
 * (#method Callback.onSown) corresponding at moment the snack-bar is completely visible.
 * (#method Callback.onDismissed) corresponding at moment the snack-bar is completely dismissed.
 * 
 * @interface Callback
 * @version 1.0
 * @since 1.0
 */
export interface Callback
{
    /**
     * Called at the moment the snack-bar is shown
     * 
     * @type {void}
     * @since 1.0
     */
    onShown():void;

    /**
     * Called at the moment the snack-bar is dismised
     * 
     * @param event The code of event listener
     * @type {void}
     * @since 1.0
     */
    onDismissed(event:number):void;
}

class SnackbarRecord
{
    callback:Callback;
    duration:number;

    public constructor(callback:Callback, duration:number)
    {
        this.callback = callback;
        this.duration = duration;
    }

    public isSnackbar(callback:Callback):boolean
    {
        return callback != null && this.callback == callback;
    }
}

class SnackbarManager
{
    private component:Component;

    private currentSnackbar:SnackbarRecord;
    private nextSnackbar:SnackbarRecord;

    private static snackbarManager:SnackbarManager;

    private MSG_TIMEOUT = 0;

    private SHORT_DURATION_MS:number = 1500;
    private LONG_DURATION_MS:number = 2750;
    private DEFAULT_DURATION:number = this.SHORT_DURATION_MS;

    private constructor()
    {
        this.component = new Component({
            handleMessage:function(message:Message)
            {
                if (message.id == this.MSG_TIMEOUT)
                {
                    this.handleTimeout(<SnackbarRecord>message.object);
                }
            }.bind(this)
        });
    }

    public static getInstance():SnackbarManager
    {
        if (this.snackbarManager == null)
        {
            this.snackbarManager = new SnackbarManager();
        }
        return this.snackbarManager;
    }

    show(callback:Callback, duration:number):void
    {
        if (this.isCurrentSnackbarLocked(callback))
        {
            this.currentSnackbar.duration = duration;
            this.scheduleTimeoutLocked(this.currentSnackbar);
            return;
        }
        else if (this.isNextSnackbarLocked(callback))
        {
            this.nextSnackbar.duration = duration;
        }
        else
        {
            this.nextSnackbar = new SnackbarRecord(callback, duration);
        }

        if (this.currentSnackbar != null && this.cancelSnackbarLocked(this.currentSnackbar, DismissEvent.DISMISS_EVENT_CONSECUTIVE))
        {
            return;
        }
        else
        {
            this.currentSnackbar = null;
            this.showNextSnackbarLocked();
        }
    }

    dismiss(callback:Callback, event:number):void
    {
        if (this.isCurrentSnackbarLocked(callback))
        {
            this.cancelSnackbarLocked(this.currentSnackbar, event);
        }
        else if (this.isNextSnackbarLocked(callback))
        {
            this.cancelSnackbarLocked(this.nextSnackbar, event);
        }
    }

    onDismissed(callback:Callback):void
    {
        if (this.isCurrentSnackbarLocked(callback))
        {
            this.currentSnackbar = null;
            if (this.nextSnackbar != null)
            {
                this.showNextSnackbarLocked();
            }
        }
    }

    onShown(callback:Callback):void
    {
        if (this.isCurrentSnackbarLocked(callback))
        {
            this.scheduleTimeoutLocked(this.currentSnackbar);
        }
    }
    
    isCurrent(callback:Callback):boolean
    {
        return this.isCurrentSnackbarLocked(callback);
    }

    isCurrentOrNex(callback:Callback):boolean
    {
        return this.isCurrentSnackbarLocked(callback) || this.isNextSnackbarLocked(callback);
    }

    private isCurrentSnackbarLocked(callback:Callback):boolean
    {
        return this.currentSnackbar != null && this.currentSnackbar.isSnackbar(callback);
    }

    private isNextSnackbarLocked(callback:Callback):boolean
    {
        return this.nextSnackbar != null && this.nextSnackbar.isSnackbar(callback);
    }

    private cancelSnackbarLocked(record:SnackbarRecord, event:number):boolean
    {
        const callback:Callback = record.callback;
        if (callback != null)
        {
            this.component.removeComponent(record);
            callback.onDismissed(event);
            return true;
        }
        return false;
    }

    private showNextSnackbarLocked():void
    {
        if (this.nextSnackbar != null)
        {
            this.currentSnackbar = this.nextSnackbar;
            this.nextSnackbar = null;

            const callback:Callback = this.currentSnackbar.callback;
            if (callback != null)
            {
                callback.onShown();
            }
            else
            {
                this.currentSnackbar = null;
            }
        }
    }

    private handleTimeout(record:SnackbarRecord):void
    {
        if (this.currentSnackbar == record || this.nextSnackbar == record)
        {
            this.cancelSnackbarLocked(record, DismissEvent.DISMISS_EVENT_TIMEOUT);
        }
    }

    private scheduleTimeoutLocked(record:SnackbarRecord):void
    {
        if (record.duration == Duration.LENGTH_INDEFINITE)
        {
            return;
        }

        let durationMs:number = this.DEFAULT_DURATION;
        if (record.duration == Duration.LENGTH_LONG)
        {
            durationMs = this.LONG_DURATION_MS;
        }
        else if (record.duration == Duration.LENGTH_SHORT)
        {
            durationMs = this.SHORT_DURATION_MS;
        }
        else if (record.duration >= 250)
        {
            durationMs = record.duration;
        }
        else
        {
            console.warn("The duration connot be than 250 millisecondes. The default duration is used.");
        }

        this.component.removeComponent(record);
        this.component.sendMessageDelayed(IMessage.obtain(record, this.MSG_TIMEOUT, 0, 0), durationMs);
    }
}

abstract class BaseSnackbar<B extends BaseSnackbar<B>>
{
    private parent:HTMLElement;
    private container:HTMLElement;
    private content:HTMLElement;
    private messageView:HTMLParagraphElement;
    private actionView:HTMLButtonElement;
    private actionViewMessage:HTMLElement;
    private component:Component;

    private ANIMATION_DURATION = 250;
    private MSG_SHOW:number = 1;
    private MSG_DISMISS:number = 2;

    protected duration:number;
    protected message:string;
    protected callback:Callback;

    constructor(parent:HTMLElement)
    {
        this.parent = parent;
        this.component = new Component({
            handleMessage:function(message:Message)
            {
                let base:BaseSnackbar<B> = (<BaseSnackbar<B>>message.object);
                switch (message.id)
                {
                    case base.MSG_SHOW:
                        base.showView();
                        break;
                    case base.MSG_DISMISS:
                        base.hideView(message.arg1);
                        break;
                    default:
                        break;
                }
            }
        });

        this.container = document.querySelector(".span.snackbar-container");
        this.content = document.querySelector(".span.snackbar-content");

        this.container = document.createElement("span");
        this.content = document.createElement("span");
        this.messageView = document.createElement("p");
        this.actionView = document.createElement("button");
        this.actionViewMessage = document.createElement("p");
    }

    /**
     * Check if the current snack-bar is shown
     * 
     * @returns return true if the the current snack-bar is shown
     * @type {boolean}
     * @since 1.0
     */
    public isShown():boolean
    {
        return SnackbarManager.getInstance().isCurrent(this.managerCallback);
    }

    /**
     * Show the snack-bar token sended
     * 
     * @type {void}
     * @since 1.0
     */
    public show():void
    {
        SnackbarManager.getInstance().show(this.managerCallback, this.duration);
    }

    /**
     * Delete the snack-bar sended by last token
     * 
     * @type {void}
     * @since 1.0
     */
    public dismiss():void
    {
        this.dispatchDismiss(DismissEvent.DISMISS_EVENT_MANUAL);
    }

    private managerCallback:Callback = {
        onShown:function()
        {
            this.component.sendMessage(IMessage.obtain(this, this.MSG_SHOW, 0, 0));
        }.bind(this),
        onDismissed:function(event:number)
        {
            this.component.sendMessage(IMessage.obtain(this, this.MSG_DISMISS, event, 0))
        }.bind(this)
    };

    private showView():void
    {
        this.parent.appendChild(this.container);
        this.container.appendChild(this.content);
        this.content.appendChild(this.messageView)
        this.content.appendChild(this.actionView);
        this.actionView.appendChild(this.actionViewMessage);

        this.container.classList.add("snackbar-container");
        this.content.classList.add("snackbar-content");
        this.messageView.classList.add("snackbar-message");
        this.actionView.classList.add("snackbar-button");
        this.actionViewMessage.classList.add("snackbar-button-container-message");

        this.actionView.setAttribute("selectable-theme", "light");

        setTimeout(() =>
        {
            this.onViewShown();
            Selectable.applyOn("button.snackbar-button");
        }, this.ANIMATION_DURATION);
    }

    private hideView(event:number):void
    {
        this.container.style.transform = "translateY(100%)";
        this.messageView.style.opacity = "0";
        if (this.actionView != null)
        {
            this.actionView.style.opacity = "0";
        }
        setTimeout(() =>
        {
            this.onViewHidden(event);
        }, this.ANIMATION_DURATION);
    }

    private onViewShown():void
    {
        SnackbarManager.getInstance().onShown(this.managerCallback);
        if (Callable.requireNonNull(this.callback, "onShown"))
        {
            this.callback.onShown();
        }
    }

    private onViewHidden(event:number):void
    {
        SnackbarManager.getInstance().onDismissed(this.managerCallback);
        if (Callable.requireNonNull(this.callback, "onDismissed"))
        {
            this.callback.onDismissed(event);
        }
        this.container.remove();
    }

    protected getMessageView():HTMLParagraphElement
    {
        return this.messageView;
    }

    protected getActionView():HTMLButtonElement
    {
        return this.actionView;
    }

    protected getActionViewMessage():HTMLElement
    {
        return this.actionViewMessage;
    }

    protected dispatchDismiss(event:number):void
    {
        SnackbarManager.getInstance().dismiss(this.managerCallback, event);
    }
}

/**
 * Snackbar is a way to have a small message at bottom of screen.
 * 
 * @class Snackbar
 * @version 2.0
 * @since 1.0
 */
export class Snackbar extends BaseSnackbar<Snackbar>
{
    private PREFIX_EXCEPTION:string = "Snackbar: ";

    private static snackbar:Snackbar;

    /**
     * Code for init a long duration
     * 
     * @constant LENGTH_LONG
     * @type {number}
     * @since 1.0
     */
    public static LENGTH_LONG:number = Duration.LENGTH_LONG;

    /**
     * Code for init a short duration
     * 
     * @constant LENGTH_SHORT
     * @type {number}
     * @since 1.0
     */
    public static LENGTH_SHORT:number = Duration.LENGTH_SHORT;

    /**
     * Code for init a infinite duration
     * 
     * @constant LENGTH_INDEFINITE
     * @type {number}
     * @since 1.0
     */
    public static LENGTH_INDEFINITE:number = Duration.LENGTH_INDEFINITE;

    /**
     * Code for get the event to disappear on click event
     * 
     * @constant DISMISS_EVENT_ACTION
     * @type {number}
     * @since 1.2
     */
    public static DISMISS_EVENT_ACTION:number = DismissEvent.DISMISS_EVENT_ACTION;

    /**
     * Code for get the event to disappear on time out
     * 
     * @constant DISMISS_EVENT_TIMEOUT
     * @type {number}
     * @since 1.2
     */
    public static DISMISS_EVENT_TIMEOUT:number = DismissEvent.DISMISS_EVENT_TIMEOUT;

    /**
     * Code for get the event to disappear at called (#method Snackbar.dismiss) method
     * 
     * @constant DISMISS_EVENT_MANUAL
     * @type {number}
     * @since 1.2
     */
    public static DISMISS_EVENT_MANUAL:number = DismissEvent.DISMISS_EVENT_MANUAL;

    /**
     * Code for get the event to disappear at called (#method Snackbar.show) serval times
     * 
     * @type {number}
     * @since 1.2
     */
    public static DISMISS_EVENT_CONSECUTIVE:number = DismissEvent.DISMISS_EVENT_CONSECUTIVE;

    /**
     * Default constructor
     * 
     * Init a new token snack-bar
     * 
     * @param parent primary parent (example document.body)
     * @since 1.0
     */
    public constructor(parent:HTMLElement)
    {
        super(parent);
    }

    /**
     * Init a new token snack-bar
     * 
     * @param parent primary parent (example document.body)
     * @param message Your message
     * @param duration Your custom duration in millisecondes. you can use the pre-installed duration (#code Snackbar.LENGTH_LONG), (#code Snackbar.LENGTH_SHORT) (#code Snackbar.LENGTH_INDEFINITE)
     * @returns return Snackbar class
     * @type {Snackbar}
     * @since 1.0
     */
    public static make(parent:HTMLElement, message:string, duration:number):Snackbar
    {
        this.snackbar = new Snackbar(parent);
        this.snackbar.setText(message);
        this.snackbar.setDuration(duration);

        return this.snackbar;
    }

    /**
     * Set a event listener
     * 
     * @param callback The event listener of snackbar
     * @returns return Snackbar class
     * @type {Snackbar}
     * @since 1.3
     */
    public setCallback(callback:Callback):Snackbar
    {
        if (this.callback != callback)
        {
            this.callback = callback;
        }
        return this;
    }

    /**
     * Init a duration
     * 
     * Use custom duration or use the pre-installed duration (#code Snackbar.LENGTH_LONG), (#code Snackbar.LENGTH_SHORT) (#code Snackbar.LENGTH_INDEFINITE)
     * 
     * @param duration your custom duration in millisecondes
     * @returns return Snackbar class
     * @type {Snackbar}
     * @since 1.0
     */
    public setDuration(duration:number):Snackbar
    {
        if (!Argument.isNumber(duration))
        {
            throw new ObjectCastException(this.PREFIX_EXCEPTION + "The argument in the `setDuration` method should be a Integer or use the pre-installed duration [Snackbar.LENGTH_LONG] or [Snackbar.LENGTH_SHORT] or [Snackbar.LENGTH_INDEFINITE].");
        }
        this.duration = duration;
        return this;
    }

    /**
     * Set a message
     * 
     * @param message Your message
     * @returns return Sncakbar class
     * @since 1.0
     */
    public setText(message:string):Snackbar
    {
        if (!Argument.isString(message))
        {
            throw new ObjectCastException(this.PREFIX_EXCEPTION + "The argument in the `setText` method should be a String.");
        }
        if (!StringUtils.isEmpty(message))
        {
            let messageView:HTMLParagraphElement = this.getMessageView();
            messageView.innerHTML = message;
        }
        return this;
    }

    /**
     * Set a text color of your message
     * 
     * @param color Your custom color (syntax RGB, RGBA, HSL, HSLA HEXADECIMAL)
     * @returns return Snackbar class
     * @type {Snackbar}
     * @since 1.0
     */
    public setTextColor(color:string):Snackbar
    {
        if (!Argument.isString(color))
        {
            throw new ObjectCastException(this.PREFIX_EXCEPTION + "The argument in the `setTextColor` method should be a String.");
        }
        if (!StringUtils.isEmpty(color))
        {
            let messageView = this.getMessageView();
            if (!(new RegExp(RegularExpressions.RGB).test(color)) && !(new RegExp(RegularExpressions.RGBA).test(color)) && !(new RegExp(RegularExpressions.HSL).test(color)) && !(new RegExp(RegularExpressions.HSLA).test(color)) && !(new RegExp(RegularExpressions.HEXADECIMAL).test(color)))
            {
                throw new IllegalArgumentException(this.PREFIX_EXCEPTION + color + " is invalid color. Please make sure you use a RGB or RGBA or HSL or HSLA or HEXADECIMAL color.");
            }
            messageView.style.color = color;
        }
        return this;
    }

    /**
     * Set the button snackbar and init a text and click event
     * 
     * @param text The text of button snackbar
     * @param listener Init an event listener on click event
     * @returns return Snackbar class
     * @type {Snackbar}
     * @since 1.0
     */
    public setAction(text:string, listener:OnClickListener):Snackbar
    {
        if (!Argument.isString(text))
        {
            throw new ObjectCastException(this.PREFIX_EXCEPTION + "The argument in the `setAction` method should be a String.");
        }
        if (!StringUtils.isEmpty(text))
        {
            let actionView:HTMLButtonElement = this.getActionView();
            let actionViewMessage:HTMLElement = this.getActionViewMessage();

            actionViewMessage.innerText = text;
            actionView.style.display = "flex";
            if (Callable.requireNonNull(listener, "onClick"))
            {
                actionView.addEventListener("click", () =>
                {
                    setTimeout(() => {
                        this.dispatchDismiss(DismissEvent.DISMISS_EVENT_ACTION);
                        listener.onClick();
                    }, 100);
                });
            }
        }
        return this;
    }

    /**
     * Set a text color of button
     * 
     * @param color text color of button
     * @returns return Snackbar
     * @type {Snackbar}
     * @since 1.0
     */
    public setActionTextColor(color:string):Snackbar
    {
        if (!Argument.isString(color))
        {
            throw new ObjectCastException(this.PREFIX_EXCEPTION + "The argument in the `setActionTextColor` method should be a String.");
        }
        if (!StringUtils.isEmpty(color))
        {
            let actionView:HTMLButtonElement = this.getActionView();
            if (!(new RegExp(RegularExpressions.RGB).test(color)) && !(new RegExp(RegularExpressions.RGBA).test(color)) && !(new RegExp(RegularExpressions.HSL).test(color)) && !(new RegExp(RegularExpressions.HSLA).test(color)) && !(new RegExp(RegularExpressions.HEXADECIMAL).test(color)))
            {
                throw new IllegalArgumentException(this.PREFIX_EXCEPTION + color + " is invalid color. Please make sure you use a RGB or RGBA or HSL or HSLA or HEXADECIMAL color.");
            }
            actionView.style.color = color;
            actionView.style.display = "flex";
        }
        return this;
    }
}

class BaseSelectable
{
    private circle:HTMLElement;
    private scrollable:Scrollable;
    private apply:boolean;
    
    constructor(view:HTMLElement)
    {
        this.scrollable = Scrollable.get();
        this.createTouchingListener(view);
        window.onresize = ()=>
        {
            this.updateTouchingListener(view);
        }
    }

    baseSelectable(event:MouseEvent|TouchEvent):void
    {
        this.apply = true;

        let target:HTMLElement = (<HTMLElement>event.currentTarget);
        this.circle = document.querySelector("span.selectable");
        if (!this.circle)
        {
            this.circle = document.createElement("span");
            target.appendChild(this.circle);
        }
        if (target.getAttribute("selectable-theme") === "light")
        {
            this.circle.style.background = "rgba(255, 255, 255, 0.12)";
        }
        else if (target.getAttribute("selectable-theme") === "dark")
        {
            this.circle.style.background = "rgba(0, 0, 0, 0.12)";
        }

        let max:number = Math.max(target.offsetWidth, target.offsetHeight);
        let meansure:number = (max * 2.5);
        let rect:DOMRect = target.getBoundingClientRect();

        let clientX:number = 0;
        let clientY:number = 0;
        if (event instanceof MouseEvent)
        {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        if (event instanceof TouchEvent)
        {
            clientX = event.changedTouches[0].clientX;
            clientY = event.changedTouches[0].clientY;
        }
        this.circle.style.width = meansure + "px";
        this.circle.style.height = meansure + "px";
        this.circle.style.left = clientX - rect.left - (meansure / 2) + "px";
        this.circle.style.top = clientY - rect.top - (meansure / 2) + "px";

        this.circle.classList.add("snackbar-button-selectable");
    }

    baseDismiss():void
    {
        this.scrollable.enable();
        this.circle.style.opacity = "0";
        
        setTimeout(() => {
            this.apply = false;
            this.circle.remove();
        }, 480);
    }

    baseLeave(event:TouchEvent|MouseEvent):void
    {
        if (this.apply)
        {
            if (event instanceof MouseEvent)
            {
                this.baseDismiss();
            }
        }
    }

    baseMove(event:TouchEvent|MouseEvent):void
    {
        if (event instanceof TouchEvent)
        {
            this.scrollable.disable();
        }
    }

    private applySelectable:any = this.baseSelectable.bind(this);
    private applyDismiss:any = this.baseDismiss.bind(this);
    private applyMove:any = this.baseMove.bind(this);
    private applyLeave:any = this.baseLeave.bind(this);

    private createTouchingListener(view:HTMLElement):void
    {
        let isTouch:boolean = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

        let mouseDown:string = isTouch ? 'touchstart' : 'mousedown';
        let mouseUp:string = isTouch ? 'touchend' : 'mouseup';
        let mouseMove:string = isTouch ? 'touchmove' : 'mousemove';
        let mouseLeave:string = 'mouseleave';
        
        view.addEventListener(mouseDown, this.applySelectable, true);
        view.addEventListener(mouseUp, this.applyDismiss, true);
        view.addEventListener(mouseMove, this.applyMove, true);
        view.addEventListener(mouseLeave, this.applyLeave, true);
    }

    private destroyTouchingListener(view:HTMLElement):void
    {
        let isTouch:boolean = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

        let mouseDown:string = isTouch ? 'touchstart' : 'mousedown';
        let mouseUp:string = isTouch ? 'touchend' : 'mouseup';
        let mouseMove:string = isTouch ? 'touchmove' : 'mousemove';
        let mouseLeave:string = 'mouseleave';
        
        view.removeEventListener(mouseDown, this.applySelectable, true);
        view.removeEventListener(mouseUp, this.applyDismiss, true);
        view.removeEventListener(mouseMove, this.applyMove, true);
        view.removeEventListener(mouseLeave, this.applyLeave, true);
    }

    private updateTouchingListener(view:HTMLElement):void
    {
        this.destroyTouchingListener(view);
        this.createTouchingListener(view);
    }
}

class Selectable extends BaseSelectable
{
    private constructor(view:HTMLElement)
    {
        super(view);
    }

    public static applyOn(selectors:string):void
    {
        new Selectable(document.querySelector(selectors));
    }
}