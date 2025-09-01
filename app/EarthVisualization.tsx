"use client"

import { useEffect, useRef } from "react"

export default function EarthVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      const dpr = window.devicePixelRatio || 1
      const size = Math.min(container.offsetWidth, 600)

      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`

      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let rotation = 0
    const getCanvasSize = () => {
      const size = Math.min(canvas.parentElement?.offsetWidth || 600, 600)
      return { width: size, height: size }
    }

    const animate = () => {
      const { width, height } = getCanvasSize()
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(centerX, centerY) - 60

      ctx.clearRect(0, 0, width, height)

      const continentData = [
        // North America - more detailed coastline
        {
          name: "North America",
          paths: [
            // Western coast
            [
              [70, -160],
              [65, -165],
              [60, -150],
              [55, -130],
              [50, -125],
              [45, -124],
              [40, -124],
              [35, -120],
              [32, -117],
            ],
            // Eastern coast
            [
              [70, -60],
              [65, -65],
              [60, -70],
              [55, -65],
              [50, -60],
              [45, -65],
              [40, -75],
              [35, -80],
              [30, -85],
              [25, -80],
            ],
            // Great Lakes region
            [
              [50, -90],
              [48, -95],
              [45, -85],
              [42, -82],
              [45, -75],
              [48, -80],
            ],
            // Mexico
            [
              [32, -117],
              [30, -115],
              [25, -110],
              [20, -105],
              [15, -95],
              [20, -90],
              [25, -95],
              [30, -100],
            ],
          ],
        },
        // Europe - detailed coastlines
        {
          name: "Europe",
          paths: [
            // Scandinavia
            [
              [71, 25],
              [70, 20],
              [68, 15],
              [65, 10],
              [60, 5],
              [58, 8],
              [60, 12],
              [65, 18],
              [68, 22],
            ],
            // British Isles
            [
              [60, -8],
              [58, -6],
              [55, -4],
              [52, -2],
              [50, 0],
              [52, -5],
              [55, -8],
              [58, -10],
            ],
            // Mediterranean
            [
              [45, -10],
              [43, -5],
              [40, 0],
              [38, 5],
              [36, 10],
              [38, 15],
              [40, 20],
              [43, 15],
              [45, 10],
            ],
          ],
        },
        // Asia - major regions
        {
          name: "Asia",
          paths: [
            // Russia/Siberia
            [
              [75, 60],
              [70, 80],
              [65, 100],
              [60, 120],
              [65, 140],
              [70, 160],
              [75, 180],
            ],
            // China/Southeast Asia
            [
              [50, 80],
              [45, 90],
              [40, 100],
              [35, 110],
              [30, 115],
              [25, 120],
              [20, 105],
              [15, 100],
              [10, 95],
            ],
            // India
            [
              [35, 70],
              [30, 75],
              [25, 80],
              [20, 85],
              [15, 80],
              [10, 75],
              [8, 77],
              [15, 85],
              [25, 88],
              [35, 85],
            ],
            // Japan
            [
              [45, 140],
              [42, 142],
              [38, 140],
              [35, 138],
              [32, 135],
              [35, 132],
              [40, 135],
              [43, 138],
            ],
          ],
        },
        // Africa - continental outline
        {
          name: "Africa",
          paths: [
            // Main continent
            [
              [37, -10],
              [35, 0],
              [30, 10],
              [25, 20],
              [20, 30],
              [15, 40],
              [10, 45],
              [5, 50],
              [0, 45],
              [-5, 40],
              [-10, 35],
              [-15, 30],
              [-20, 25],
              [-25, 20],
              [-30, 15],
              [-35, 10],
              [-30, 5],
              [-25, 0],
              [-20, -5],
              [-15, -10],
              [-10, -5],
              [0, 0],
              [10, 5],
              [20, 0],
              [30, -5],
              [37, -10],
            ],
          ],
        },
        // South America
        {
          name: "South America",
          paths: [
            [
              [12, -70],
              [8, -75],
              [0, -80],
              [-10, -75],
              [-20, -70],
              [-30, -65],
              [-40, -60],
              [-50, -65],
              [-55, -70],
              [-50, -75],
              [-40, -70],
              [-30, -75],
              [-20, -80],
              [-10, -85],
              [0, -90],
              [8, -85],
              [12, -80],
            ],
          ],
        },
        // Australia/Oceania
        {
          name: "Australia",
          paths: [
            [
              [-10, 115],
              [-15, 125],
              [-25, 135],
              [-35, 145],
              [-40, 150],
              [-35, 155],
              [-25, 150],
              [-15, 140],
              [-10, 130],
            ],
          ],
        },
      ]

      const populationCenters = [
        // Major metropolitan areas
        { lat: 40.7128, lng: -74.006, density: 12, name: "New York" },
        { lat: 51.5074, lng: -0.1278, density: 10, name: "London" },
        { lat: 35.6762, lng: 139.6503, density: 15, name: "Tokyo" },
        { lat: 39.9042, lng: 116.4074, density: 14, name: "Beijing" },
        { lat: 31.2304, lng: 121.4737, density: 13, name: "Shanghai" },
        { lat: 28.6139, lng: 77.209, density: 16, name: "Delhi" },
        { lat: 19.076, lng: 72.8777, density: 14, name: "Mumbai" },
        { lat: -23.5505, lng: -46.6333, density: 11, name: "São Paulo" },
        { lat: 19.4326, lng: -99.1332, density: 10, name: "Mexico City" },
        { lat: 30.0444, lng: 31.2357, density: 9, name: "Cairo" },
        { lat: -26.2041, lng: 28.0473, density: 8, name: "Johannesburg" },
        { lat: -33.8688, lng: 151.2093, density: 7, name: "Sydney" },
        { lat: 37.7749, lng: -122.4194, density: 8, name: "San Francisco" },
        { lat: 34.0522, lng: -118.2437, density: 9, name: "Los Angeles" },
        { lat: 55.7558, lng: 37.6176, density: 8, name: "Moscow" },
        { lat: 1.3521, lng: 103.8198, density: 7, name: "Singapore" },
        { lat: 25.2048, lng: 55.2708, density: 6, name: "Dubai" },
        { lat: 52.52, lng: 13.405, density: 6, name: "Berlin" },
        { lat: 48.8566, lng: 2.3522, density: 7, name: "Paris" },
        { lat: 41.9028, lng: 12.4964, density: 5, name: "Rome" },
      ]

      const networkNodes = [
        { lat: 37.7749, lng: -122.4194, label: "+" },
        { lat: 40.7128, lng: -74.006, label: "+" },
        { lat: 51.5074, lng: -0.1278, label: "+" },
        { lat: 35.6762, lng: 139.6503, label: "+" },
        { lat: 1.3521, lng: 103.8198, label: "+" },
        { lat: -33.8688, lng: 151.2093, label: "+" },
        { lat: 52.52, lng: 13.405, label: "+" },
        { lat: 55.7558, lng: 37.6176, label: "+" },
      ]

      // Convert lat/lng to 3D coordinates
      const latLngTo3D = (lat: number, lng: number, r: number) => {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lng + 180 + rotation) * (Math.PI / 180)

        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.cos(phi)
        const z = r * Math.sin(phi) * Math.sin(theta)

        return { x, y, z }
      }

      // Project 3D to 2D
      const project3DTo2D = (x: number, y: number, z: number) => {
        const scale = 400 / (400 + z)
        return {
          x: centerX + x * scale,
          y: centerY - y * scale,
          visible: z > -radius * 0.3,
        }
      }

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = "rgba(64, 224, 208, 0.4)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      for (let lng = -180; lng <= 180; lng += 20) {
        ctx.beginPath()
        ctx.strokeStyle = "rgba(64, 224, 208, 0.25)"
        ctx.lineWidth = 0.8

        let firstPoint = true
        for (let lat = -90; lat <= 90; lat += 3) {
          const point3D = latLngTo3D(lat, lng, radius)
          const point2D = project3DTo2D(point3D.x, point3D.y, point3D.z)

          if (point2D.visible) {
            if (firstPoint) {
              ctx.moveTo(point2D.x, point2D.y)
              firstPoint = false
            } else {
              ctx.lineTo(point2D.x, point2D.y)
            }
          } else {
            firstPoint = true
          }
        }
        ctx.stroke()
      }

      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath()
        ctx.strokeStyle = "rgba(64, 224, 208, 0.25)"
        ctx.lineWidth = 0.8

        let firstPoint = true
        for (let lng = -180; lng <= 180; lng += 3) {
          const point3D = latLngTo3D(lat, lng, radius)
          const point2D = project3DTo2D(point3D.x, point3D.y, point3D.z)

          if (point2D.visible) {
            if (firstPoint) {
              ctx.moveTo(point2D.x, point2D.y)
              firstPoint = false
            } else {
              ctx.lineTo(point2D.x, point2D.y)
            }
          } else {
            firstPoint = true
          }
        }
        ctx.stroke()
      }

      continentData.forEach((continent) => {
        continent.paths.forEach((path) => {
          ctx.beginPath()
          ctx.strokeStyle = "rgba(64, 224, 208, 0.9)"
          ctx.lineWidth = 1.8

          let firstPoint = true
          path.forEach(([lat, lng]) => {
            const point3D = latLngTo3D(lat, lng, radius + 1)
            const point2D = project3DTo2D(point3D.x, point3D.y, point3D.z)

            if (point2D.visible) {
              if (firstPoint) {
                ctx.moveTo(point2D.x, point2D.y)
                firstPoint = false
              } else {
                ctx.lineTo(point2D.x, point2D.y)
              }
            }
          })
          ctx.stroke()
        })
      })

      populationCenters.forEach((center) => {
        const point3D = latLngTo3D(center.lat, center.lng, radius + 1)
        const point2D = project3DTo2D(point3D.x, point3D.y, point3D.z)

        if (point2D.visible) {
          // Create realistic population density visualization
          const numDots = Math.floor(center.density * 15)
          for (let i = 0; i < numDots; i++) {
            const angle = (i / numDots) * Math.PI * 2
            const distance = Math.random() * center.density * 2
            const offsetX = Math.cos(angle) * distance
            const offsetY = Math.sin(angle) * distance

            ctx.beginPath()
            ctx.arc(point2D.x + offsetX, point2D.y + offsetY, 0.8, 0, 2 * Math.PI)
            ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.5})`
            ctx.fill()
          }
        }
      })

      networkNodes.forEach((node) => {
        const point3D = latLngTo3D(node.lat, node.lng, radius + 3)
        const point2D = project3DTo2D(point3D.x, point3D.y, point3D.z)

        if (point2D.visible) {
          const size = 12
          const pulseIntensity = 0.8 + 0.2 * Math.sin(Date.now() * 0.004)

          // Enhanced glow effect
          ctx.shadowColor = "rgba(64, 224, 208, 0.8)"
          ctx.shadowBlur = 15

          // Draw plus symbol with better styling
          ctx.strokeStyle = `rgba(64, 224, 208, ${pulseIntensity})`
          ctx.lineWidth = 3
          ctx.lineCap = "round"

          // Horizontal line
          ctx.beginPath()
          ctx.moveTo(point2D.x - size, point2D.y)
          ctx.lineTo(point2D.x + size, point2D.y)
          ctx.stroke()

          // Vertical line
          ctx.beginPath()
          ctx.moveTo(point2D.x, point2D.y - size)
          ctx.lineTo(point2D.x, point2D.y + size)
          ctx.stroke()

          // Reset shadow
          ctx.shadowBlur = 0

          // Outer glow ring
          ctx.beginPath()
          ctx.arc(point2D.x, point2D.y, size * 1.8, 0, 2 * Math.PI)
          ctx.strokeStyle = `rgba(64, 224, 208, ${0.15 * pulseIntensity})`
          ctx.lineWidth = 4
          ctx.stroke()
        }
      })

      rotation += 0.2

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
    </div>
  )
}
