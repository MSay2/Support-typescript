/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-08-28 08:22:32
 * @ Modified on: 2020-09-22 07:29:41
 * 
 * @version 1.1
 */

/**
 * Copyright (c) 2020 MSay2, Yoann Meclot - StringBuilder.ts
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

import { Arrays, List } from "./ArrayList.js";

/**
 * StringBuilder is a mean to build a strnig char.
 * 
 * @class StringBuilder
 * @version 1.1
 */
export class StringBuilder
{
    private mLength:number = 0;
    private mValue:string[] = [];
    private mCapacity:number = -1;

    /**
     * Default constructor.
     * 
     * Set capacity to define a maximum length of your string char.
     * 
     * @param capacity Initial a maximum length of your string char.
     * @constructor StringBuilder
     */
    public constructor(capacity?:number)
    {
        if (capacity != undefined)
        {
            this.mCapacity = capacity;
        }
    }

    /**
     * Build a StringBuilder object of your primitive array.
     * 
     * @param array Your primitive array.
     * @type {StringBuilder}
     * @since 1.1
     */
    public static fromArray(array:string[]):StringBuilder
    {
        let builder:StringBuilder = new StringBuilder();
        for (let item of array)
        {
            builder.append(item);
        }
        return builder;
    }

    /**
     * Get the current length of your string char.
     * 
     * @returns Return the current length of your string char.
     * @type {number}
     * @since 1.0
     */
    public length():number
    {
        return this.mLength;
    }

    /**
     * Get the current capacity of your StringBuilder object.
     * 
     * @returns Return the current maximum capacity, return -1 if the maximum capacity is not initialized.
     * @type {number}
     * @since 1.0
     */
    public capacity():number
    {
        return this.mCapacity;
    }

    /**
     * Append a value in the builder.
     * 
     * @param value The value to be add.
     * @returns Return the current instance of StringBuilder.
     * @type {StringBuilder}
     * @since 1.0
     */
    public append(value:any):StringBuilder
    {
        if (this.mCapacity == this.mLength)
        {
            return;
        }

        if (value == null)
        {
            this.appendNull();
        }
        
        if (this.isOf(value, "String"))
        {
            this.appendString(value);
        }
        if (this.isOf(value, "Boolean"))
        {
            this.appendBoolean(value);
        }
        if (this.isOf(value, "Number"))
        {
            this.appendNumber(value);
        }
        return this;
    }

    /**
     * Append a value at the specified position.
     * 
     * @param index The indexing position.
     * @param value The value to be add.
     * @returns Return the current instance of StringBuilder.
     * @type {StringBuilder}
     * @since 1.0
     */
    public appendAt(index:number, value:any):StringBuilder
    {
        let clone:List<string> = Arrays.asList(this.mValue);
        clone.addAt(index, value);

        this.mValue = clone.toArray();
        this.mLength = clone.size();

        return this;
    }

    /**
     * Delete a char by the indexing position.
     * 
     * @param index The index corresponding to the position of char.
     * @returns Return the current instance of StringBuilder.
     * @type {StringBuilder}
     * @since 1.0
     */
    public delete(index:number):StringBuilder
    {
        let clone:List<string> = Arrays.asList(this.mValue);
        clone.remove(index);

        this.mValue = clone.toArray();
        this.mLength = clone.size();

        return this;
    }

    /**
     * Get the representation to string char format.
     * 
     * @returns Return the string char.
     * @type {string}
     * @since 1.0
     */
    public toString():string
    {
        if (this.mLength == 0)
        {
            return "";
        }
        let message:string = "";
        let index:number = 0;

        while (index < this.mLength)
        {
            message += this.mValue[index];
            index++;
        }
        return message;
    }

    private appendString(value:string):void
    {
        let length:number = value.length;
        let index:number = 0;

        while (index < length)
        {
            let char:string = value.charAt(index);
            this.mValue[this.mLength++] = char;
            index++;
        }
    }

    private appendBoolean(value:boolean):void
    {
        let message:string;
        value ? message = "true" : message = "false";

        this.appendString(message);
    }

    private appendNumber(value:number):void
    {
        let message:string = new String(value).valueOf();
        this.appendString(message);
    }

    private appendNull():void
    {
        let message:string = "null";
        this.appendString(message);
    }

    private isOf(object:Object, name:string):boolean
    {
        return object.constructor.name == name;
    }
}