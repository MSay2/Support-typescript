/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-06-04 05:54:17
 * @ Modified on: 2020-07-04 23:41:56
 * 
 * @version 1.5
 */

/**
 * Copyright (c) 2020 MSay2 - LinkedMap.ts
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

import {NullPointerException, IllegalArgumentException, ObjectCastException, MaximumCapacityException} from "./Exceptions.js";

import {StringUtils} from "./Utils.js";
import {Argument} from "./Argument.js";

/**
 * The Entry class is a mean to log a key associated with its value.
 * 
 * The Entry class is used by the EntryIterable class to obtain each entry to the map 
 * and thus obtain each key and value in a loop.
 * 
 * @class Entry<K,V>
 * @version 1.1
 * @since 1.4
 */
abstract class Entry<K, V>
{
    /**
     * Show the size of the map
     * 
     * @return return the size of the map
     * @type {number}
     * @since 1.1
     */
    readonly size:number;

    /**
     * Show all keys of the map
     * 
     * @return return the all keys of the map
     * @type {String[]}
     * @since 1.0
     */
    readonly keys:K[];

    /**
     * Show all values of the map
     * 
     * @return return the values of the map
     * @type {Object[]}
     * @since 1.0
     */
    readonly values:V[];

    /**
     * Get the key of the map
     * 
     * @returns {String[]} the keys of the map
     * @since 1.0
     */
    public abstract getKey():K;

    /**
     * Get the value of the map
     * 
     * @return {Object[]} the value of the map
     * @since 1.0
     */
    public abstract getValue():V;
}

/**
 * The EntryIterable class is a mean to reiterate the entries to the map.
 * 
 * It allows to you obtain eachs values and eachs keys of eachs entries of the map
 * with its respectives methods (#method Entry.getKey) and (#method Entry.getValue).
 * 
 * @class EntryIterable
 * @implements {Iterable}
 * @version 1.0
 * @since 1.5
 */
class EntryIterable implements Iterable<Entry<String, Object>>
{
    private keys:String[] = [];
    private values:Object[] = [];
    private index:number = -1;
    private size:number = 0;

    public constructor(entry:Entry<String, Object>)
    {
        this.size = entry.size;
        this.keys = entry.keys;
        this.values = entry.values;
    }

    [Symbol.iterator]():Iterator<Entry<String, Object>, any, undefined>
    {
        return {
            next:() =>
            {
                this.index++;
                if (this.index < this.size)
                {
                    return {
                        value: {
                            size: this.size,
                            keys: this.keys,
                            values: this.values,

                            getKey:function()
                            {
                                return this.keys[this.index];
                            }.bind(this),
                            getValue:function()
                            {
                                return this.values[this.index];
                            }.bind(this)
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
 * Public constants for type of inversement of the map.
 * 
 * @class MapType
 * @version 1.0
 * @since 1.0
 */
export abstract class MapType
{
    /**
     * Reverse only keys
     * 
     * @constant TYPE_KEYS
     * @type {number}
     * @since 1.0
     */
    public static TYPE_KEYS = -1;

    /**
     * Reverse only values
     * 
     * @constant TYPE_VALUES
     * @type {number}
     * @since 1.0
     */
    public static TYPE_VALUES = -2;
}

/**
 * The LinkedMap tool allows you to manipulate a map containing keys and values.
 * 
 * LinkedMap is a way to create and manage a associative array.
 * 
 * @class Map
 * @version 1.5
 * @since 1.0
 */
export abstract class Map
{    
    /**
     * Return the size of map
     * 
     * @returns return the size of the map
     * @type {number}
     * @since 1.0
     */
    abstract length():number;
    
    /**
     * Check if the value exists in the map
     * 
     * @param value the specified value
     * @returns return true if the occurrence is existing in the map
     * @type {boolean}
     * @since 1.0
     */
    abstract exist(value:Object):boolean;

    /**
     * Return the key of the finded occurrence in the map 
     * 
     * @param value value whose the key in the map is to be finded
     * @returns return null if the map does not contain the occurrence
     * @type {String | null}
     * @since 1.2
     */
    abstract keyOf(value:Object):String|null;

    /**
     * Add a specific value and associates with the specified key in this map
     * 
     * @param key key with which the specified value is to be associated
     * @param value value to be associated with the specified key
     * @type {void}
     * @throws MaximumCapacityException when you have reached the maximum capacity of elements that the map can contain
     * @throws IllegalArgumentException if the key is not a String type
     * @throws NullPointerException if the key is null or empty
     * @throws IllegalArgumentException if the key is already existing in the map
     * @since 1.5
     */
    abstract add(key:String, value:Object):void;

    /**
     * Add a specific value onnly if the value is not in the map and associates with the specified key in this map
     * 
     * @todo This is use the default implementation of (#method Map.add)
     * 
     * @param key key with which the specified value is to be associated
     * @param value value to be associated with the specified key
     * @type {void}
     * @throws MaximumCapacityException when you have reached the maximum capacity of elements that the map can contain
     * @throws IllegalArgumentException if the key is not a String type
     * @throws NullPointerException if the key is null or empty
     * @throws IllegalArgumentException if the key is already existing in the map
     * @since 1.5
     */
    abstract addIfAbsent(key:String, value:Object):void;

    /**
     * Add all datas of one map in the current map
     * 
     * @todo This is use the default implementation of (#method Map.add)
     * 
     * @param maps The newests maps to add
     * @type {void}
     * @throws ObjectCastException if the (#param maps) is not not an instance of LinkedMap
     * @throws MaximumCapacityException when you have reached the maximum capacity of elements that the map can contain
     * @throws IllegalArgumentException if the key is not a String type
     * @throws NullPointerException if the key is null or empty
     * @throws IllegalArgumentException if the key is already existing in the map
     * @since 1.5
     */
    abstract addAll(...maps:Map[]):void;

    /**
     * Get the value with the specified keys
     * 
     * @param key key with which the specified value is to be associated
     * @returns return the added value specified by its key or return null if the key does not exist on the map
     * @type {Object | null}
     * @since 1.0
     */
    abstract get(key:String):Object|null;

    /**
     * Replace the value by the associated specified key in the map by the new specified value
     * 
     * @param key key of value to replace
     * @param value value to be replaced at the place of specified associate key
     * @type {void}
     * @throws IllegalArgumentException if the key does not exist in the map
     * @since 1.5
     */
    abstract set(key:String, value:Object):void;

    /**
     * Remove the value with its associated specified key
     * 
     * @param key key of value to remove
     * @type {void}
     * @throws IllegalArgumentException if the key does not exist in the map
     * @since 1.5
     */
    abstract remove(key:String):void;

    /**
     * Clear the map
     * 
     * Remove all keys and values
     * 
     * @type {void}
     * @since 1.2
     */
    abstract clear():void;

    /**
     * Check if the map is empty
     * 
     * @return return true if the map is empty and return false if the map is not empty
     * @type {boolean}
     * @since 1.4
     */
    abstract isEmpty():boolean;
    
    /**
     * Reiterate each entry of the map for obtain the values and keys
     * 
     * @return return the entries iterable
     * @type {Iterable<Entry<String, Object>>}
     * @since 1.4
     */
    abstract entries():Iterable<Entry<String, Object>>;

    /**
     * Reverse the map
     * 
     * @param type Type of inversement
     * @type {void}
     * @todo (optional) You can try enter a type of inversement
     * @constant MapType.TYPE_KEYS
     * @constant MapType.TYPE_VALUES
     * @example map.reverse() map.reverse(MapType.TYPE_KEYS) map.revers(MapType.TYPE_VALUES)
     * @since 1.3
     */
    abstract reverse(type?:number):void;

    /**
     * Return the map to char string format
     * 
     * @return return the map to char string format
     * @type {string}
     * @example 
     * Syntax:
     * [
     *  "key1" => "value1",
     *  "key2" => "1",
     *  "key3" => "false",
     *  "key4" => "Object",
     *  "key5" => "1.2"
     * ]
     * @since 1.0
     */
    abstract toString():string;

    /**
     * Return the map to JSON string format
     * 
     * @return return the map to JSON format
     * @type {string}
     * @throws IllegalArgumentException if the map contain an object
     * @example
     * Syntax:
     * {
     *  "key1": "value1",
     *  "key2": 1,
     *  "key3": false,
     *  "key4": 1.2
     * }
     * @since 1.5
     */
    abstract toJSON():string;
}

/**
 * The LinkedMap tool allows you to manipulate a map containing keys and values.
 * 
 * LinkedMap is a way to create and manage a associative array.
 * 
 * @class LinkedMap
 * @version 1.5
 * @since 1.0
 */
export class LinkedMap extends Map
{
    private keys:String[] = [];
    private values:Object[] = [];
    private size:number = 0;

    private PREFIX_EXCEPTION:string = "LinkedMap: ";
    private MAXIMUM_CAPACITY:number = 1 << 30;

    public length():number
    {
        return this.size;
    }

    public exist(value:Object):boolean
    {
        return this.indexOf(value) >= 0;
    }

    public keyOf(value:Object):String|null
    {
        let index = this.indexOf(value);
        if (index >= 0)
        {
            for (let i:number = 0; i < this.size; i++)
            {
                if (index == i)
                {
                    return this.keys[i];
                }
            }
        }
        return null;
    }

    public add(key:String, value:Object):void
    {
        if (this.size >= this.MAXIMUM_CAPACITY)
        {
            throw new MaximumCapacityException(this.PREFIX_EXCEPTION + "You have reached the maximum capacity of elements of the map. You have not permission to add a new value in the map.");
        }
        
        if (!Argument.isString(key))
        {
            throw new ObjectCastException(this.PREFIX_EXCEPTION + "The key must always be a string.");
        }
        if (StringUtils.isEmpty(key))
        {
            throw new NullPointerException(this.PREFIX_EXCEPTION + "You cannot add a new value if the key is null or empty.");
        }
        if (this.checkIfKeyExist(key) >= 0)
        {
            throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "The key `"+key+"` already exists in the map.");
        }
        this.keys[this.size] = key;
        this.values[this.size] = value;
        
        this.ensureIncrementSize(1);
    }

    public addIfAbsent(key:String, value:Object):void
    {
        let v = this.get(key);
        if (v == null)
        {
            this.add(key, value);
        }
    }

    public addAll(...maps:Map[]):void
    {
        for (let map of maps)
        {
            if (!Argument.isOf(map, "LinkedMap"))
            {
                throw new ObjectCastException(this.PREFIX_EXCEPTION + map.constructor.name + " is not an instance of LinkedMap");
            }
            
            let size:number = map.length();
            if (size > 0)
            {
                for (let entry of map.entries())
                {
                    this.add(entry.getKey(), entry.getValue());
                }
            }
        }
    }

    public get(key:String):object|null
    {
        let index:number = this.checkIfKeyExist(key);
        if (index >= 0)
        {
            for (let i:number = 0; i < this.size; i++)
            {
                if (index == i)
                {
                    return this.values[i];
                }
            }
        }
        return null;
    }

    public set(key:String, value:Object):void
    {
        let index:number = this.checkIfKeyExist(key);
        if (index >= 0)
        {
            for (let i:number = 0; i < this.size; i++)
            {
                if (index == i)
                {
                    this.values[i] = value;
                    return;
                }
            }
        }
        else
        {
            throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "The key `"+key+"` Does not exist in the map.");
        }
    }

    public remove(key:String):void
    {
        let index:number = this.checkIfKeyExist(key);
        if (index >= 0)
        {
            let otherKeys:String[] = [];
            let otherValues:Object[] = [];

            for (let i:number = 0, k:number = 0, v:number = 0; i < this.size; i++)
            {
                if (index == i)
                {
                    continue;
                }
                otherKeys[k++] = this.keys[i];
                otherValues[v++] = this.values[i];
            }

            this.keys = otherKeys;
            this.values = otherValues;
            this.ensureDecrementSize(1);

            otherKeys = null;
            otherValues = null;
        }
        else
        {
            throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "The key `"+key+"` Does not exist in the map.");
        }
    }

    public clear():void
    {
        this.keys = [];
        this.values = [];
        this.size = 0;
    }

    public isEmpty():boolean
    {
        return this.size == 0;
    }

    public entries():Iterable<Entry<String, Object>>
    {
        let iterable:Iterable<Entry<String, Object>> = new EntryIterable({
            size: this.size,
            values: this.values,
            keys: this.keys,
            
            getKey:function(){return "key";},
            getValue:function(){return "value";}
        });
        return iterable;
    }

    public reverse(type?:number):void
    {
        if (this.size > 0)
        {
            let otherKeys:String[] = [];
            let otherValues:Object[] = [];
            for (let i:number = this.size -1, k:number = 0, v:number = 0; i >= 0; i--)
            {
                otherKeys[k++] = this.keys[i];
                otherValues[v++] = this.values[i];
            }
            
            if (type == MapType.TYPE_KEYS)
            {
                this.keys = otherKeys;
            }
            else if (type == MapType.TYPE_VALUES)
            {
                this.values = otherValues;
            }
            else
            {
                this.keys = otherKeys;
                this.values = otherValues;
            }

            otherKeys = null;
            otherValues = null;
        }
    }

    public toString():string
    {
        let prefixArray:string = "[";
        let suffixArray:string = "]";
        let arrayToString:string = "";
        for (let i:number = 0; i < this.size; i++)
        {
            if (Argument.isPrimitive(this.values[i]))
            {
                arrayToString += "\""+this.keys[i]+"\" => \""+this.values[i]+"\",";
            }
            else
            {
                arrayToString += "\""+this.keys[i]+"\" => \""+this.values[i].constructor.name+"\",";
            }
        }
        return prefixArray + ((StringUtils.removeLastChar(arrayToString) == null) ? "" : StringUtils.removeLastChar(arrayToString)) + suffixArray;
    }

    public toJSON():string
    {
        let prefixArray:string = "{";
        let suffixArray:string = "}";
        let arrayToJSON:string = "";
        for (let i:number = 0; i < this.size; i++)
        {
            if (Argument.isPrimitive(this.values[i]))
            {
                if (Argument.isString(this.values[i]))
                {
                    arrayToJSON += "\""+this.keys[i]+"\": \""+this.values[i]+"\",";
                }
                else
                {
                    arrayToJSON += "\""+this.keys[i]+"\":"+this.values[i]+",";
                }
            }
            else
            {
                throw new IllegalArgumentException(this.PREFIX_EXCEPTION + "Your map contain an object. The JSON format can contain only primitive values [Float, Integer, Boolean, String].");
            }
        }
        return prefixArray + ((StringUtils.removeLastChar(arrayToJSON) == null) ? "" : StringUtils.removeLastChar(arrayToJSON)) + suffixArray;
    }

    /**
     * Ensures the incrementation of the size to update the current size of the map
     * 
     * @param value incremented value
     * @type {void}
     * @since 1.0
     */
    private ensureIncrementSize(value:number):void
    {
        this.size += value;
    }

    /**
     * Ensures the decrementation of the size to update the current size of the map
     * 
     * @param value Decremented value
     * @type {void}
     * @since 1.0
     */
    private ensureDecrementSize(value:number):void
    {
        this.size -= value;
    }

    /**
     * Check if the key exist in the map and return the current index for get value
     * 
     * @param key the key whose exist in the map is to be finded
     * @returns return the index of key
     * @type {number}
     * @since 1.0
     */
    private checkIfKeyExist(key:String):number
    {
        for (let i:number = 0; i < this.size; i++)
        {
            if (this.keys[i] == key)
            {
                return i;
            }
        }
        return -1;
    }

    /**
     * Return the index of the finded occurrence in the map 
     * return -1 if the map does not contain the occurrence
     * 
     * @param value value whose exist in the map is to be finded
     * @returns return the index of values
     * @type {number}
     * @since 1.0
     */
    private indexOf(value:Object):number
    {
        for (let i:number = 0; i < this.size; i++)
        {
            if (this.values[i] == value)
            {
                return i;
            }
        }
        return -1;
    }
}