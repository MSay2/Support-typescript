/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on:  2020-06-01 10:01:09
 * @ Modified on: 2020-06-22 17:23:34
 * 
 * @version 1.3
 */

/**
 * The StringUtils class is a utility for String argument
 * 
 * @class StringUtils
 * @version 1.3
 * @since 1.0
 */
export class StringUtils
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