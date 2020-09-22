/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-07-13 08:20:15
 * @ Modified on: 2020-09-22 07:51:11
 * 
 * @version 1.8
 */

/**
 * Copyright (c) 2020 MSay2, Yoann Meclot - ArrayList.ts
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
 * The Entry class is a mean to log a key associated with its value.
 * 
 * The Entry class is used by the EntryIterable class to obtain each entry to the array 
 * and thus obtain each values in a loop.
 * 
 * @class Entry<K,V>
 * @version 1.4
 * @since 1.4
 */
abstract class Entry<V>
{
    /**
     * Get the value of the array.
     * 
     * @return {Object[]} the value of the array.
     * @type {V}
     * @since 1.0
     */
    public abstract getValue():V;

    /**
     * Check if the indexing return to the last position.
     * 
     * @returns {boolean} return true if the indexing is placed to the last position.
     * @type {boolean}
     * @since 1.6
     */
    public abstract isLastData():boolean;

    /**
     * Check if the indexing return to the first position.
     * 
     * @returns {boolean} return true is the indexing is placed to the first position.
     * @type {boolean}
     * @since 1.6
     */
    public abstract isFirstData():boolean;
}

/**
 * The EntryIterable class is a mean to reiterate the entries to the array.
 * 
 * It allows to you obtain eachs values of eachs entries of the array
 * with its respectives methods Entry.getValue.
 * 
 * @class EntryIterable
 * @implements {Iterable}
 * @version 1.2
 * @since 1.5
 */
class EntryIterable implements Iterable<Entry<Object>>
{
    private values:Object[] = [];
    private index:number = -1;
    private size:number = 0;

    public constructor(values:Object[], size:number)
    {
        this.values = values;
        this.size = size;
    }

    [Symbol.iterator]():Iterator<Entry<Object>, any, undefined>
    {
        return {
            next:() =>
            {
                this.index++;
                if (this.index < this.size)
                {
                    return {
                        value: {
                            getValue:() => this.values[this.index],
                            isLastData:() =>
                            {
                                if (this.index == this.size -1) return true;
                                return false;
                            },
                            isFirstData:() =>
                            {
                                if (this.index == 0) return true;
                                return false;
                            }
                        },
                        done: false
                    };
                }
                return{
                    value: null,
                    done: true
                };
            }
        };
    }
}


/**
 * This class provides a way to handle an array containing ​​specific values to cast.
 * 
 * @class List
 * @version 1.1
 * @since 1.0
 */
export abstract class List<B>
{
    /**
     * Add a specific value in the array list.
     * 
     * @param value The value to be add.
     * @type {void}
     * @since 1.0
     */
    abstract add(value:B):void;

    /**
     * Add a specific value at a specific position.
     * 
     * @param index Corresponding to the position of the value.
     * @param value The value to be add.
     * @type {void}
     * @since 1.0
     */
    abstract addAt(index:number, value:B):void;

    /**
     * Add all datas of one array list in the current array list.
     * 
     * @type {void}
     * @since 1.5
     */
    abstract addAll(...list:List<B>[]):void;

    /**
     * Get the specific value by the indexing position.
     * 
     * @param index Corresponding to the position of your value.
     * @type {Object}
     * @since 1.0
     */
    abstract get(index:number):B|null;

    /**
     * Get the position of specific value.
     * 
     * @param value The value existing.
     * @type {number}
     * @since 1.0
     */
    abstract indexOf(value:B):number;

    /**
     * Check if the specific value is existing in the array list.
     * 
     * @param value The value to be check.
     * @type {boolean}
     * @since 1.0
     */
    abstract contains(value:B):boolean;

    /**
     * Check if the list contains a instance of the specific object name.
     * 
     * @param value The name of the instanciated class.
     * @param forAll this param is deprecated.
     * @type {boolean}
     * @since 1.6
     */
    abstract containsInstanceOf(objectName:string, forAll:boolean):boolean;

    /**
     * Check if the list contain only a instances of the specific object name.
     * 
     * @param objectName The name of the instanciated class.
     * @type {boolean}
     * @since 1.6
     */
    abstract containsOnlyInstanceOf(objectName:string):boolean;

    /**
     * Remove a specific value in the array by the indexing position.
     * 
     * @param index Corresponding to the position of the value.
     * @type {void}
     * @since 1.0
     */
    abstract remove(index:number):void;

    /**
     * Remove a certain quantity of value in the array.
     * 
     * @param start Corresponding to the indexing position of start.
     * @param count Corresponding to the indexing position of end.
     * @type {void}
     * @since 1.0
     */
    abstract removeQuantity(start:number, count:number):void;

    /**
     * Reiterate each entry of the list for obtain the values
     * 
     * @return return the entries iterable
     * @type {Iterable<Entry<Object>>}
     * @since 1.4
     */
    abstract entries():Iterable<Entry<Object>>;

    /**
     * Clear the array, remove all values.
     * 
     * @type {void}
     * @since 1.0
     */
    abstract clear():void;

    /**
     * Clear the array, remove all values.
     * 
     * @type {void}
     * @since 1.0
     */
    abstract clearMemory():void;

    /**
     * Check if the array is empty.
     * 
     * @type {boolean}
     * @since 1.0
     */
    abstract isEmpty():boolean;

    /**
     * Get the current size of the array.
     * 
     * @type {number}
     * @since 1.0
     */
    abstract size():number;

    /**
     * Convert the list in primitive array.
     * 
     * @type {B[]}
     * @since 1.6
     */
    abstract toArray():B[];
}

/**
 * This class allows you to create and join your primitive array in the ArrayList class.
 * 
 * @class Arrays
 * @version 1.0
 * @since 1.6
 */
export class Arrays
{
    /**
     * Create and join your primitive array in the ArrayList class.
     * 
     * @param array Corresponding to your primitive array.
     * @type {List<B>}
     * @since 1.0
     */
    public static asList<B>(array:B[]):List<B> 
    {
        return new ArrayList(array);
    }
}

/**
 * This class provides a way to handle an array containing ​​specific values to cast.
 * 
 * @class ArrayList
 * @version 1.2
 * @since 1.0
 */
export class ArrayList<B> extends List<B>
{
    private values:B[] = [];
    private length:number = 0;

    /**
     * Default constructor.
     * 
     * You can init a array ArrayList by your intern array, leave empty to simply 
     * create a new array.
     * 
     * @param array The array to be joined.
     * @version 1.0
     * @since 1.0
     */
    public constructor(array?:B[])
    {
        super();
        if (array != undefined && array != null)
        {
            this.values = array;
            this.length = array.length;
        }
    }

    public add(value:B):void
    {
        this.values[this.length] = value;
        this.ensureIncrementSize(1);
    }

    public addAt(index:number, value:B):void
    {
        let otherValues:B[] = [];
        for (let i:number = 0, v:number = 0, e:number = 0; i < this.length+1; i++)
        {
           if (i == index)
           {
               otherValues[v++] = value;
           }
           else
           {
               otherValues[v++] = this.values[e++];
           }
        }
        this.ensureIncrementSize(1);
        this.values = otherValues;
        
        otherValues = null;
    }

    public addAll(...lists:List<B>[]):void
    {
        for (let list of lists)
        {
            let size:number = list.size();
            if (size > 0)
            {
                for (let entry of list.entries())
                {
                    this.add(<B>entry.getValue());
                }
            }
        }
    }
    
    public get(index:number):B|null
    {
        for (let i:number = 0; i < this.length; i++)
        {
            if (index == i)
            {
                return this.values[i];
            }
        }
        return null;
    }

    public indexOf(value:B):number
    {
        for (let i:number = 0; i < this.length; i++)
        {
            if (this.values[i] == value)
            {
                return i;
            }
        }
        return -1;
    }

    public contains(value:B):boolean
    {
        return this.indexOf(value) >= 0;
    }

    public containsInstanceOf(objectName:string, forAll:boolean):boolean
    {
        if (objectName == null)
        {
            return false;
        }
        if (this.size() > 0)
        {
            let isFind:boolean = false;
            for (let entry of this.entries())
            {
                if (entry.getValue().constructor.name == objectName)
                {
                    if (!forAll)
                    {
                        return true;
                    }
                    isFind = true;
                }
            }
            return isFind;
        }
        return false;
    }

    public containsOnlyInstanceOf(objectName:string):boolean
    {
        if (objectName == null)
        {
            return false;
        }
        if (this.size() > 0)
        {
            let quantity:number = 0; 
            for (let entry of this.entries())
            {
                if (entry.getValue().constructor.name == objectName)
                {
                    quantity++;
                }
            }
            return quantity == this.size();
        }
        return false;
    }
    
    public remove(index:number):void
    {
        let otherValues:B[] = [];
        for (let i:number = 0, v:number = 0; i < this.length; i++)
        {
            if (index == i)
            {
                continue;
            }
            otherValues[v++] = this.values[i];
        }
        this.values = otherValues;
        this.ensureDecrementSize(1);

        otherValues = null;
    }

    public removeQuantity(start:number, count:number):void
    {
        for (let i:number = 0; i < count; i++)
        {
            for (let e:number = 0; e < this.length; e++)
            {
                if (e == start)
                {
                    this.remove(e);
                    return;
                }
            }
        }
    }

    public entries():Iterable<Entry<Object>>
    {
        return new EntryIterable(this.values, this.length);
    }
    
    public clear():void
    {
        for (let i:number = 0; i < this.length; i++)
        {
            this.values[i] = null;
        }
        this.length = 0;
        this.values = [];
    }

    public clearMemory():void
    {
        this.values.length = 0;
        this.length = 0;
    }
    
    public isEmpty():boolean
    {
        return this.length == 0;
    }
    
    public size():number
    {
        return this.length;
    }

    public toArray():B[]
    {
        return this.values;
    }

    /**
     * Ensures the incrementation of the size to update the current size of the array
     * 
     * @param value incremented value
     * @type {void}
     * @since 1.0
     */
    private ensureIncrementSize(value:number):void
    {
        this.length += value;
    }

    /**
     * Ensures the decrementation of the size to update the current size of the array
     * 
     * @param value Decremented value
     * @type {void}
     * @since 1.0
     */
    private ensureDecrementSize(value:number):void
    {
        this.length -= value;
    }
}