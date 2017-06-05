using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using FullstackCasen.Repositories;

namespace FullstackCasen.Migrations
{
    [DbContext(typeof(Repository))]
    [Migration("20170604200712_Initial_migration")]
    partial class Initial_migration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FullstackCasen.Server.ServerModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Servers");
                });

            modelBuilder.Entity("FullstackCasen.Server.ServiceModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("FullstackCasen.ServerServices.ServerServiceModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ServerId");

                    b.Property<int?>("ServiceId");

                    b.HasKey("Id");

                    b.HasIndex("ServerId");

                    b.HasIndex("ServiceId");

                    b.ToTable("ServerServices");
                });

            modelBuilder.Entity("FullstackCasen.ServerServices.ServerServiceModel", b =>
                {
                    b.HasOne("FullstackCasen.Server.ServerModel", "Server")
                        .WithMany()
                        .HasForeignKey("ServerId");

                    b.HasOne("FullstackCasen.Server.ServiceModel", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId");
                });
        }
    }
}
