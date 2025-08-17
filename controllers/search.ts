import { Request, Response, NextFunction } from 'express';
import { supabase } from '../clients/supabase';

export const getHomepage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { data, error } = await supabase
            .from('listings')
            .select('*, media(*)')
            .limit(6)

        if (error) {
            throw error;
        }

        return void res.status(200).json({
            data: data
        })
    } catch (error) {
        console.error('Error!')
    }
};

export const getListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.query;
    try {
        const { data, error } = await supabase
            .from('listings')
            .select('*, media(*), specs(*)')
            .eq('id', id)
            .single()

        if (error) {
            throw error;
        }

        return void res.status(200).json({
            data: data
        })
    } catch (error) {
        console.error('Error!')
    }
};

export const getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { category } = req.query;

    try {
        const { data, error } = await supabase
            .from('listings')
            .select('*, media(*)')
            .eq('subcategory', category)
            .limit(6)
            .order('daily_price', { ascending: true })

        if (error) {
            throw error;
        }

        return void res.status(200).json({
            data: data
        })
    } catch (error) {
        console.error('Error!', error)
    }
};