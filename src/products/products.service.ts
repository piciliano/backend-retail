import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/database/entities/product-entity';
import { Repository } from 'typeorm';
import { CateroryRole } from 'src/enums/category-enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      await this.findByName(createProductDto.productName);

      const productTemp = this.productRepository.create(createProductDto);

      await this.productRepository.save(productTemp);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findByName(name: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          productName: name,
        },
      });

      if (product) {
        throw new ConflictException('Product already registered!', {
          cause: new Error(),
        });
      }

      return product;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findByCategory() {
    try {
      const keyboardFull = await this.productRepository.count({
        where: { category: CateroryRole.KeyBoard },
      });
      const mouseFull = await this.productRepository.count({
        where: { category: CateroryRole.Mouse },
      });
      const desktopFull = await this.productRepository.count({
        where: { category: CateroryRole.Desktop },
      });
      const monitorFull = await this.productRepository.count({
        where: { category: CateroryRole.Monitor },
      });

      return {
        message: 'Registered categories',
        data: {
          keyboards: keyboardFull,
          mouses: mouseFull,
          desktops: desktopFull,
          monitors: monitorFull,
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.productRepository.find();

      return {
        countProducts: products.length,
        products,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException();
      }

      return product;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(id);

      if (!product) {
        throw new NotFoundException();
      }

      const productTemp = this.productRepository.merge(
        product,
        updateProductDto,
      );

      await this.productRepository.save(productTemp);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);

      if (!product) {
        throw new NotFoundException();
      }

      await this.productRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }
}
