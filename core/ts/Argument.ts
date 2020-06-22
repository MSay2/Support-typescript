/**
 * @ Author: Yoann Meclot. MSay2
 * @ Modified on: 2020-05-27 14:39:02
 * @ Modified on: 2020-06-22 12:27:46
 * 
 * @version 1.3
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