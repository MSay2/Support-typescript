/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-05-27 15:34:06
 * @ Modified on: 2020-06-23 14:39:10
 * 
 * @version 1.2
 */

/**
 * Includes Regular Expressions
 * 
 * @class RegularExpressions
 * @version 1.2
 * @since 1.0
 */
export abstract class RegularExpressions
{
    /**
     * Syntax color red blue green
     * 
     * @type {RegExp}
     * @since 1.0
     */
    public static RGB:RegExp = /rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)/gm;
    
    /**
     * Syntax color red blue green alpha
     * 
     * @type {RegExp}
     * @since 1.0
     */
    public static RGBA:RegExp = /rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})(?:\s*0*(?:1|0(?:\.\d+)?)\s*)\)/gm;
 
    /**
     * Syntax color hue saturation lightness
     * 
     * @type {RegExp}
     * @since 1.0
     */
    public static HSL:RegExp = /hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)/gm;
    
    /**
     * Syntax color hue saturation lightness alpha
     * 
     * @type {RegExp}
     * @since 1.0
     */
    public static HSLA:RegExp = /hsla\(\s*0*((?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}),(?:\s*0*(?:1|0(?:\.\d+)?)\s*)\)/gm;

    /**
     * Syntax color hexadecimal
     * 
     * @type {RegExp}
     * @since 1.0
     */
    public static HEXADECIMAL:RegExp = /#[A-Fa-f0-9]{6}\b/gm;

    /**
     * Syntax text email
     * 
     * @type {RegExp}
     * @since 1.2
     */
    public static EMAIL:RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9]*[a-z0-9])?/gm;
}