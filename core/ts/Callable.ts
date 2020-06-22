/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-05-27 10:49:40
 * @ Modified on: 2020-06-22 11:14:17
 * 
 * @version 1.0
 */

 /**
  * The Callable class is a tool for check if the Interface or Class use one methods or properties 
  * implemented of the specified Interface or Class.
  * 
  * @class Callable
  * @version 1.0
  * @since 1.0
  */
 export class Callable
 {
     /**
      * Check if the implemented interface use a property or method
      * 
      * @param callable the Interface or Class
      * @param property the property in your Interface or Class
      */
     public static requireNonNull(callable:{}, property:string):boolean
     {
         if (callable != null && property in callable)
         {
             return true;
         }
         return false;
     }
 }