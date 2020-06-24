/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-05-28 18:49:06
 * @ Modified on: 2020-06-24 14:58:18
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
 * The Scrollable class is tool for manage the scroll.
 * 
 * @class Scrollable
 * @version 1.3
 * @since 1.0
 */

export class Scrollable
{
    private passive:boolean = false;
    private wheel:Object|boolean = false;

    private constructor()
    {
        try
        {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                get:function()
                {
                    this.passive = true;
                }.bind(this)
            }));
        }
        catch(e){}

        this.wheel = this.passive ? {passive:false} : false;
    }

    /**
     * Get new instance
     * 
     * @returns return Scrollable class
     * @type {Scrollable}
     * @since 1.0
     */
    public static get():Scrollable
    {
        return new Scrollable();
    }

    /**
     * Disable scroll
     * 
     * @returns return Scrollable class
     * @type {Scrollable}
     * @since 1.0
     */
    public disable():void
    {
        window.addEventListener("touchmove", this.preventDefault, this.wheel);
    }

    /**
     * Enable scroll
     * 
     * @returns return Scrollable class
     * @type {Scrollable}
     * @since 1.0
     */
    public enable():void
    {
        window.removeEventListener("touchmove", this.preventDefault, this.wheel);
    }

    /**
     * Refresh state
     * 
     * @param event event returned by the (#method document.addEventListener) and (#method document.removeEventListener) methods
     */
    private preventDefault(event:TouchEvent):void
    {
        event.preventDefault();
    }
}