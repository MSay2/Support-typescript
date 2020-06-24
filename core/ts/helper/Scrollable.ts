/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-05-28 18:49:06
 * @ Modified on: 2020-06-23 18:19:36
 * 
 * @version 1.3
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