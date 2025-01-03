USE [UrwaveTask]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 1/2/2025 4:03:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 1/2/2025 4:03:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241231082252_init', N'8.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241231082534_init2', N'8.0.0')
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([Id], [Name], [Description], [Price], [CreatedDate]) VALUES (1, N'Iphone 17', N'Iphone 16 Mobile Phone', CAST(100000.00 AS Decimal(18, 2)), CAST(N'2024-12-31T08:37:46.2444147' AS DateTime2))
INSERT [dbo].[Products] ([Id], [Name], [Description], [Price], [CreatedDate]) VALUES (2, N'Google Pixel 8', N'Google Pixel 8 smartphone', CAST(80000.00 AS Decimal(18, 2)), CAST(N'2024-12-31T08:40:46.5425914' AS DateTime2))
INSERT [dbo].[Products] ([Id], [Name], [Description], [Price], [CreatedDate]) VALUES (3, N'OnePlus 9 Pro', N'Flagship OnePlus device with 5G', CAST(90000.00 AS Decimal(18, 2)), CAST(N'2024-12-31T08:41:18.4314204' AS DateTime2))
INSERT [dbo].[Products] ([Id], [Name], [Description], [Price], [CreatedDate]) VALUES (4, N'Xiaomi Mi 11', N'Xiaomi Mi 11 with Snapdragon 888', CAST(75000.00 AS Decimal(18, 2)), CAST(N'2024-12-31T08:42:10.6967388' AS DateTime2))
INSERT [dbo].[Products] ([Id], [Name], [Description], [Price], [CreatedDate]) VALUES (5, N'Sony Xperia 1 III', N'Sony Xperia 1 III with 4K display', CAST(110005.00 AS Decimal(18, 2)), CAST(N'2024-12-31T08:43:17.4534527' AS DateTime2))
INSERT [dbo].[Products] ([Id], [Name], [Description], [Price], [CreatedDate]) VALUES (6, N'Motorola Edge Plus', N'Motorola Edge Plus with OLED display', CAST(105000.00 AS Decimal(18, 2)), CAST(N'2024-12-31T08:43:36.0437549' AS DateTime2))
INSERT [dbo].[Products] ([Id], [Name], [Description], [Price], [CreatedDate]) VALUES (9, N'Dark', N'Description', CAST(123.00 AS Decimal(18, 2)), CAST(N'2025-01-01T23:31:36.8362455' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
