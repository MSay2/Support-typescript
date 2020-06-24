/**
 * @ Author: Yoann Meclot. MSay2
 * @ Modified on: 2020-05-27 14:39:02
 * @ Modified on: 2020-06-24 14:59:40
 * 
 * @version 1.3
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

/**
 * The Argument class is a tool for check if the value is a primitive value.
 * 
 * @class Argument
 * @version 1.3
 * @since 1.0
 */
export class Argument
{
    /**
     * Check if the value is a type of reference name
     * 
     * @param object value to check
     * @param name name class
     * @type {boolean}
     * @since 1.3
     */
    public static isOf(object:Object, name:string):boolean
    {
        return object.constructor.name == name;
    }

    /**
     * Check if the value is a String type
     * 
     * @param object value to check
     * @returns return true if the value is a String type
     * @type {boolean}
     * @since 1.0
     */
    public static isString(object:Object):boolean
    {
        return this.isOf(object, "String");
    }

    /**
     * Check if the value is a Boolean type
     * 
     * @param object value to check
     * @returns return true if the value is a Boolean type
     * @type {boolean}
     * @since 1.0
     */
    public static isBoolean(object:Object):boolean
    {
        return this.isOf(object, "Boolean");
    }

    /**
     * Check if the value is a Number (Integer) type
     * 
     * @param object value to check
     * @returns return true if the value is a Number (Integer) type
     * @type {boolean}
     * @since 1.0
     */
    public static isNumber(object:Object):boolean
    {
        return this.isOf(object, "Number");
    }

    /**
     * Check if the value is a primitive type
     * 
     * @param object value to check
     * @returns return true if the value is a primitive type
     * @type {boolean}
     * @since 1.2
     */
    public static isPrimitive(object:Object):boolean
    {
        return this.isString(object) || this.isBoolean(object) || this.isNumber(object);
    }
}