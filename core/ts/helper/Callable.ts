/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-05-27 10:49:40
 * @ Modified on: 2020-07-04 23:58:42
 * 
 * @version 1.0
 */

/**
 * Copyright (c) 2020 MSay2 - Callable.ts
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
  * The Callable class is a tool for check if the Interface or Class use one or more methods or properties 
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
      * @returns return true if your interface or class use one or more methods or properties implemented of the specified interface or class
      * @type {boolean}
      * @since 1.0
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