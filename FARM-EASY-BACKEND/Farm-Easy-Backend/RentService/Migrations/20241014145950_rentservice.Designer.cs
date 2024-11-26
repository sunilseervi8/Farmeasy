﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RentService.DataAccess;

#nullable disable

namespace RentService.Migrations
{
    [DbContext(typeof(RentalDBContext))]
    [Migration("20241014145950_rentservice")]
    partial class rentservice
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RentService.Model.Rental", b =>
                {
                    b.Property<string>("RentalId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<decimal>("ReantalPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("RentalDescription")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("RentalImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RentalIsApproved")
                        .HasColumnType("bit");

                    b.Property<string>("RentalLocation")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("RentalNumberPlate")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("RentalTitle")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RentalId");

                    b.ToTable("Rentals");
                });
#pragma warning restore 612, 618
        }
    }
}
