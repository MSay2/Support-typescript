/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-06-21 10:01:08
 * @ Modified on: 2020-06-24 14:59:13
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
 * The EventManager class is a tool for manage event.
 * 
 * @class EventManager
 * @version 1.0
 * @since 1.0
 */
export class EventManager
{
    /**
     * Clear the completely the event
     * 
     * @param event the event returned by the (#method document.addEventListener) and (#method document.removeEventListener) methods
     * @type {void}
     * @since 1.0
     */
    public static stop(event:Event):void
    {
        event.stopImmediatePropagation();
        event.preventDefault();
        event.stopPropagation();
    }
}