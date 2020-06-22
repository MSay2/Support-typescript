/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-06-01 23:48:31
 * @ Modified on: 2020-06-22 11:29:36
 * 
 * @version 1.3
 */

import {IllegalArgumentException} from "./Exceptions.js";
import {Map} from "./LinkedMap.js";
import {Argument} from "./Argument.js";
import { Callable } from "./Callable.js";

/**
 * The Callback interface is a event listener for inflation of your layout.
 * 
 * @class Callback
 * @version 1.0
 * @since 1.3
 */
export interface Callback
{
    /**
     * This method is called at moment the inflation is finished and ready
     * 
     * @type {void}
     * @since 1.0
     */
    onFinishInflater():void;
}

/**
 * The Inflater class is a tool for inflated your layout.
 * 
 * @class Inflater
 * @version 1.3
 * @since 1.0
 */
export class Inflater
{
    private element:Element;
    private params:Map;
    private callback:Callback;

    private PREFIX_EXCEPTION = "Inflater: ";

    private constructor(element:Element)
    {
        this.element = element;
    }

    /**
     * Join your inflater element
     * 
     * @param element your element at inflate
     * @returns return Inflater class
     * @type {Inflater}
     * @since 1.0
     */
    public static from(element:Element):Inflater
    {
        return new Inflater(element);
    }

    /**
     * Append your map for use the protocol HTTP and with the GET method
     * 
     * @param params the map to send
     * @returns return Inlfater class
     * @type {Inflater}
     * @since 1.3
     */
    public appendParams(params:Map):Inflater
    {
        this.params = params;
        return this;
    }

    /**
     * Set the event listener
     * 
     * @param callback the event listener
     * @returns return Inflater class
     * @type {Inflater}
     * @since 1.2
     */
    public setCallback(callback:Callback):Inflater
    {
        this.callback = callback;
        return this;
    }

    /**
     * Init the inflation
     * 
     * @throws IllegalArgumentException if your element does not have the (#code layout) attribute
     * @throws IllegalArgumentException if your element have the (#code layout) attribute empty
     * @throws IllegalArgumentException if the params sending have one or more values and keys null
     * @throws IllegalArgumentException if the params not contain primitives values
     * @throws IllegalArgumentException if your element is not inherit of the (#code inflater) tag
     * @type {void}
     * @since 1.3
     */
    public inflate():void
    {
        if (this.element.tagName == "INFLATER" || this.element.tagName == "inflater")
        {
            let path:string = this.element.getAttribute("layout");
            if (path == null)
            {
                throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "Your element ["+this.element.tagName+"] Does not have the `layout` attribute.");
            }
            if (path.length == 0)
            {
                throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "The `layout` attribute should not be empty.");
            }
            let url:URL = new URL(path, window.location.href);
            for (let entry of this.params.entries())
            {
                if (entry.getKey() == null || entry.getValue() == null)
                {
                    throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "Your params contain a null key or value. All keys and values must be non-null");
                }
                if (!Argument.isPrimitive(entry.getValue()))
                {
                    throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "You can append only primitive values params [Float, Integer, Boolean, String] but one or more values is not primitives values.");
                }
                url.searchParams.append(encodeURIComponent((<string>entry.getKey())), encodeURIComponent((<string>entry.getValue())));
            }

            if (Callable.requireNonNull(this.callback, "onFinishInflater"))
            {
                fetch(url.href, {method: "GET"})
                    .then(data => data.text())
                    .then(html => this.element.innerHTML += html)
                    .then(onFinishInflater => this.callback.onFinishInflater());
            }
        }
        else
        {
            throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "Your element ["+this.element.tagName+"] should inherit of tag `inflater`, has <inflater></inflater>.");
        }
    }
}