/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-06-21 10:01:08
 * @ Modified on: 2020-06-24 10:14:20
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