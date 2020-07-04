/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-05-24 08:54:59
 * @ Modified on: 2020-07-04 23:44:05
 * 
 * @version 1.3
 */

/**
 * Copyright (c) 2020 MSay2 - Component.ts
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Callable} from "./Callable.js";

/**
 * The Component tool is a means to manipulates of components of object.
 * 
 * This tools allows to you add one or more components
 * and delete this components with a associated event listener.
 * 
 * @class BaseComponent
 * @version 1.3
 * @since 1.0
 */
abstract class BaseComponent
{
    /**
     * Put the specified component in the list of components
     * 
     * @param component the specified component
     * @type {void}
     * @since 1.0
     */
    abstract putComponent(component:Object):void;

    /**
     * Put the specified component in the list of components
     * and delete the added specified component after a duration 
     * 
     * @deprecated this method is deprecated because you can't get your object in event listener.
     * This method is not useful.
     * 
     * Use (#method Component.sendMessage) method, or use (#method Component.sendMessageDelayed)
     * @param component the specified component
     * @param delayMs specified duration in milliseconds
     * @type {void}
     * @since 1.0
     */
    abstract putComponentDelayed(component:Object, delayMs:number):void;

    /**
     * Send additional properties with your component with the "Message" interface
     * 
     * @param message the Message interface with additional properties
     * @type {void}
     * @since 1.2
     */
    abstract sendMessage(message:Message):void;

    /**
     * Send additional properties with your component with the "Message" interface
     * and delete the added specified component in "Message" interface after a duration
     * 
     * @param message the "Message" interface with additional properties
     * @param delayMs specified duration in milisecondes
     * @type {void}
     * @since 1.2
     */
    abstract sendMessageDelayed(message:Message, delayMs:number):void;

    /**
     * Delete your component without duration and do not call the event listener
     * 
     * @param component the specified component at deleted
     * @type {void}
     * @since 1.0
     */
    abstract removeComponent(component:Object):void;

    protected callback:Callback;

    protected constructor(callback:Callback)
    {
        this.callback = callback;
    }
}

/**
 * The Message interface provides properties to make sharing of components more flexible.
 * 
 * @class Message
 * @version 1.0
 * @since 1.0
 */
export interface Message
{
    /**
     * The object property is associated at your component
     * 
     * @return the associated component
     * @type {Object}
     * @since 1.0
     */
    object?:Object;

    /**
     * The id property is associated at a argument
     * 
     * @return The id property is associated at a argument
     * @type {Number}
     * @since 1.0
     */
    id?:number;
    
    /**
     * The arg1 property is associated at a argument
     * 
     * @return The arg1 property is associated at a argument
     * @type {Number}
     * @since 1.0
     */
    arg1?:number;

    /**
     * The arg2 property is associated at a argument
     * 
     * @return The arg2 property is associated at a argument
     * @type {Number}
     * @since 1.0
     */
    arg2?:number;
}

/**
 * Send Message interface by the (#method IMessage.obtain method.
 * 
 * @class IMessage
 * @version 1.0
 * @since 1.2
 */
export class IMessage implements Message
{
    private constructor(){}

    /**
     * Use this method for send Message
     * 
     * @param object The object property is associated at your component
     * @param id The id property is associated at a argument
     * @param arg1 The arg1 property is associated at a argument
     * @param arg2 The arg2 property is associated at a argument
     * 
     */
    public static obtain(object?:Object, id?:number, arg1?:number, arg2?:number):Message
    {
        return {
            object: object,
            id: id,
            arg1: arg1,
            arg2: arg2
        }
    }
}

/**
 * The Callback interface allows to you have a return of event
 * with the (#method putComponent), 
 * (#method sendMessage), 
 * (#method putComponentDelayed), 
 * (#method sendMessageDelayed) methods.
 * 
 * @class Callback
 * @version 1.0
 * @since 1.2
 */
interface Callback
{
    /**
     * This method is called at a component is put or send
     * 
     * @type {void}
     * @since 1.0
     */
    handleMessage(message:Message):void;
}


/**
 * The Component tool is a means to manipulates of components of object.
 * 
 * This tools allows to you add one or more components
 * and delete this components with a associated event listener.
 * 
 * @class Component
 * @version 1.2
 * @since 1.0
 */
export class Component extends BaseComponent
{
    private components:Object[] = [];
    private message:Message;

    public constructor(callback:Callback)
    {
        super(callback);
    }

    public putComponent(component:Object):void
    {
        this.components.push(component);
    }

    public putComponentDelayed(component:Object, delayMs:number):void
    {
        this.putComponent(component);
        setTimeout(() =>
        {
            this.remove(component, true);
        }, delayMs);
    }

    public sendMessage(message:Message):void
    {
        this.message = message;
        if (Callable.requireNonNull(this.callback, "handleMessage"))
        {
            this.callback.handleMessage(message);
            this.putComponent(message.object);
        }
    }

    public sendMessageDelayed(message:Message, delayMs:number):void
    {
        this.message = message;
        this.putComponentDelayed(message.object, delayMs);
    }

    public removeComponent(component:Object):void
    {
        this.remove(component, false);
    }

    private remove(component:Object, notify:boolean):void
    {
        for (let i:number = 0; i < this.components.length; i++)
        {
            if (component == this.components[i])
            {
                this.components.splice(i, 1);
                if (notify)
                {
                    if (Callable.requireNonNull(this.callback, "handleMessage"))
                    {
                        this.callback.handleMessage(this.message);
                    }
                }
            }
        }
    }
}