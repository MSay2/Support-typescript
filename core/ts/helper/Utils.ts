/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on:  2020-06-01 10:01:09
 * @ Modified on: 2020-09-22 07:22:02
 * 
 * @version 1.5
 */

/**
 * Copyright (c) 2020 MSay2, Yoann Meclot - Utils.ts
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

/**
 * The UString class is a utility for String argument
 * 
 * @class UString
 * @version 1.5
 * @since 1.0
 */
export class UString
{
    /**
     * Check if the value is null or empty
     * 
     * @param value value to check
     * @returns return true if the value is a String type
     * @type {boolean}
     * @since 1.0
     */
    public static isEmpty(value:String):boolean
    {
        return value == null || value.trim().length == 0;
    }

    /**
     * Check if the argument contain the specified value 
     * 
     * @param arg the argument to verify
     * @param value the value to check
     * @returns return true is the argument contain the specified value
     * @type {boolean}
     * @since 1.4
     */
    public static contains(arg:string, value:string):boolean
    {
        return arg.indexOf(value) >= 0;
    }

    /**
     * Remove the last char of your value String
     * 
     * @param value value to change
     * @returns return the value changed
     * @type {string}
     * @since 1.2
     */
    public static removeLastChar(value:string):string
    {
        let result:string = null;
        if ((value != null) && (value.length > 0))
        {
            result = value.substring(0, value.length -1);
        }
        return result;
    }

    /**
     * Remove the first char of your value String
     * 
     * @param value value to change
     * @returns return the value changed
     * @type {string}
     * @since 1.2
     */
    public static removeFirstChar(value:string):string
    {
        let result:string = null;
        if ((value != null) && (value.length > 0))
        {
            result = value.substring(1);
        }
        return result;
    }

    /**
     * Check if the value is a valid url
     * 
     * @param value value to check
     * @returns return true if the value is a valid url
     * @type {boolean}
     * @since 1.3
     */
    public static isValidUrl(value:string):boolean
    {
        if (this.isEmpty(value))
        {
            return false;
        }
        return value.startsWith("http://") || value.startsWith("https://");
    }
}